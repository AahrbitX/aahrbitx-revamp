"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  addChunk,
  editKnowledgeBase,
  deleteChunks,
  getChunksByOrg,
  deepScrape,
  uploadFile,
} from "@/lib/api";
import { useAuthOrg } from "@/providers/auth-org-provider"; // Add this import
import { BookDashed } from "lucide-react";
import { toast } from "sonner";

// interface InboxContentProps {
//   knowledgeBase: any[];
//   setKnowledgeBase: React.Dispatch<React.SetStateAction<any[]>>;
//   loadingKB: boolean;
// }


export default function InboxContent() {
  // Per-chunk edit state

  const { currentSelector } = useAuthOrg();
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]);
  const [loadingKB, setLoadingKB] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const clientId = currentSelector?.org_id;

  if (!clientId) {
    return <div className="text-red-500">No organization selected</div>;
  }

  useEffect(() => {
    async function fetchKB() {
      setLoadingKB(true);
      try {
        const res = await getChunksByOrg(clientId!);
        console.log("Fetched knowledge base:", res);
        if (res.status === "success") {
          setKnowledgeBase(res.chunks || []);
        }
      } catch (e) {
        // handle error
      } finally {
        setLoadingKB(false);
      }
    }
    fetchKB();
  }, [clientId]);

  //
  const [editingChunks, setEditingChunks] = useState<{
    [docId: string]: {
      [chunkId: string]: { title: string; content: string; dirty: boolean };
    };
  }>({});
  const [loadingChunk, setLoadingChunk] = useState<{
    docId?: string;
    chunkId?: string;
  } | null>(null);
  const [loadingAll, setLoadingAll] = useState(false);
  const [selectMode, setSelectMode] = useState<{ [docId: string]: boolean }>(
    {}
  );
  const [selectedChunks, setSelectedChunks] = useState<{
    [docId: string]: Set<string>;
  }>({});

  // Start editing a chunk
  const startEditChunk = (docId: string, chunk: any) => {
    setEditingChunks((prev) => ({
      ...prev,
      [docId]: {
        ...prev[docId],
        [chunk.id ?? chunk.chunkId]: {
          title: chunk.title ?? "",
          content: chunk.content ?? "",
          dirty: false,
        },
      },
    }));
  };

  // Update chunk field
  const updateEditingChunk = (
    docId: string,
    chunkId: string,
    field: "title" | "content",
    value: string
  ) => {
    setEditingChunks((prev) => ({
      ...prev,
      [docId]: {
        ...prev[docId],
        [chunkId]: {
          ...prev[docId]?.[chunkId],
          [field]: value,
          dirty: true,
        },
      },
    }));
  };

  // Save chunk (submit to backend)
  const saveChunk = async (docId: string, chunkId: string) => {
    setLoadingChunk({ docId, chunkId });
    const chunkData = editingChunks[docId][chunkId];
    try {
      const res = await editKnowledgeBase(docId, [
        {
          id: chunkId,
          section: chunkData.title,
          text: chunkData.content,
        },
      ]);
      if (res.status === "success") {
        toast.success("Chunk saved successfully");
        setEditingChunks((prev) => {
          const docChunks = { ...prev[docId] };
          delete docChunks[chunkId];
          const newState = { ...prev };
          if (Object.keys(docChunks).length) newState[docId] = docChunks;
          else delete newState[docId];
          return newState;
        });
      } else {
        toast.error("Failed to save chunk");
      }
    } catch {
      toast.error("Network error");
    }
    setLoadingChunk(null);
  };

  // Reset chunk (revert to original)
  const resetChunk = (docId: string, chunk: any) => {
    setEditingChunks((prev) => {
      const docChunks = { ...prev[docId] };
      docChunks[chunk.id ?? chunk.chunkId] = {
        title: chunk.title,
        content: chunk.content,
        dirty: false,
      };
      return { ...prev, [docId]: docChunks };
    });
  };

  // Global submit all
  const submitAll = async () => {
    setLoadingAll(true);
    let success = true;
    for (const docId of Object.keys(editingChunks)) {
      const updates = Object.entries(editingChunks[docId]).map(
        ([chunkId, data]) => ({
          id: chunkId,
          section: data.title,
          text: data.content,
        })
      );
      try {
        const res = await editKnowledgeBase(docId, updates);
        if (res.status !== "success") success = false;
      } catch {
        success = false;
      }
    }
    setEditingChunks({});
    setLoadingAll(false);

    success
      ? toast.success("All chunks submitted")
      : toast.error("Some chunks failed to submit");
  };

  // Global reset all
  const resetAll = () => {
    setEditingChunks({});
  };

  // Modal state for adding chunk
  const [addModal, setAddModal] = useState<{ open: boolean; docId?: string }>({
    open: false,
    docId: undefined,
  });
  const [addChunkData, setAddChunkData] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });
  const [addLoading, setAddLoading] = useState(false);

  const openAddChunkModal = (docId: string) => {
    setAddModal({ open: true, docId });
    setAddChunkData({ title: "", content: "" });
  };

  const handleAddChunkSubmit = async () => {
    if (!addModal.docId) return;
    setAddLoading(true);
    try {
      const res = await addChunk(addModal.docId, {
        section: addChunkData.title,
        text: addChunkData.content,
      });
      if (res.status === "success") {
        toast.success("Chunk added");
        setKnowledgeBase((prev) =>
          prev.map((d) =>
            d.documentId === addModal.docId
              ? {
                  ...d,
                  chunks: [
                    ...d.chunks,
                    {
                      id: `chunk${Date.now()}`,
                      title: addChunkData.title,
                      content: addChunkData.content,
                    },
                  ],
                }
              : d
          )
        );
        setAddModal({ open: false, docId: undefined });
      } else {
        toast.error("Failed to add chunk");
      }
    } catch {
      toast.error("Network error");
    }
    setAddLoading(false);
  };

  // Add Document Modal state
  const [addDocModal, setAddDocModal] = useState(false);
  const [docType, setDocType] = useState<"url" | "file" | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [addDocLoading, setAddDocLoading] = useState(false);

  // Add Document handlers
  const { user: AppUser } = useAuthOrg(); // Get the real user
  const handleAddDoc = async () => {
    setAddDocLoading(true);
    try {
      if (docType === "url") {
        // Call deepScrape API
        const res = await deepScrape({
          url: urlInput,
          org_id: clientId,
          user_id: AppUser?.id ?? "",
          email: AppUser?.email ?? "",
          name: AppUser?.email ?? "",
          role: AppUser?.app_role || "user",
          file_type: "web",
          channel: "web",
        });
        if (res.status === "success") {
          toast.success("URL document added");
          setAddDocModal(false);
          setDocType(null);
          setUrlInput("");
        } else {
          toast.error("Failed to add URL document");
        }
      } else if (docType === "file" && fileInput) {
        const res = await uploadFile({
          file: fileInput,
          org_id: clientId,
          user_id: AppUser?.id ?? "",
          email: AppUser?.email ?? "",
          name: AppUser?.email ?? "",
          role: AppUser?.app_role || "user",
          file_type: fileInput.type.split("/")[1] || "pdf",
          channel: "web",
        });
        if (res.status === "success") {
          toast.success("File document added");
          setAddDocModal(false);
          setDocType(null);
          setFileInput(null);
        } else {
          toast.error("Failed to add file document");
        }
      }
    } catch {
      toast.error("Network error");
    }
    setAddDocLoading(false);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 bg-background sticky top-0 z-10 py-4 px-6">
        <h1 className="text-2xl font-bold text-white">Knowledge Base</h1>
      <div className="flex items-center space-x-4">
          <Input
            placeholder="Search documents..."
            className="w-64"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Button variant="secondary" onClick={() => setAddDocModal(true)}>
            <BookDashed /> Add Document
          </Button>
          <Button variant="ghost" onClick={() => {
            setLoadingKB(true);
            (async function fetchKB() {
              try {
                const res = await getChunksByOrg(clientId!);
                if (res.status === "success") {
                  setKnowledgeBase(res.chunks || []);
                }
              } catch (e) {
                // handle error
              } finally {
                setLoadingKB(false);
              }
            })();
          }}>
            Refresh
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {loadingKB ? (
          <div className="text-slate-400">Loading...</div>
        ) : knowledgeBase.length === 0 ? (
          <div className="text-slate-400">No documents found.</div>
        ) : (
          knowledgeBase
            .filter(doc =>
              doc.title?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((doc: any) => {
            const isSelectMode = selectMode[doc.documentId] || false;
            const selectedSet = selectedChunks[doc.documentId] || new Set();
            return (
              <Card
                key={doc.documentId}
                className="bg-slate-800 text-white border-slate-700"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{doc.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAddChunkModal(doc.documentId)}
                      >
                        Add Chunk
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setSelectMode((prev) => ({
                            ...prev,
                            [doc.documentId]: !isSelectMode,
                          }))
                        }
                      >
                        {isSelectMode ? "Cancel Select" : "Select"}
                      </Button>
                      {isSelectMode && (
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={selectedSet.size === 0}
                          onClick={async () => {
                            const chunkIds = Array.from(selectedSet);
                            try {
                              const res = await deleteChunks(chunkIds);
                              if (res.status === "success") {
                                toast.success("Chunks deleted");
                                setKnowledgeBase((prev) =>
                                  prev.map((d) =>
                                    d.documentId === doc.documentId
                                      ? {
                                          ...d,
                                          chunks: d.chunks.filter(
                                            (c: any) =>
                                              !chunkIds.includes(
                                                c.id ?? c.chunkId
                                              )
                                          ),
                                        }
                                      : d
                                  )
                                );
                                setSelectedChunks((prev) => ({
                                  ...prev,
                                  [doc.documentId]: new Set(),
                                }));
                                setSelectMode((prev) => ({
                                  ...prev,
                                  [doc.documentId]: false,
                                }));
                              } else {
                                toast.error("Delete failed");
                              }
                            } catch {
                              toast.error("Network error");
                            }
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {doc.chunks.map((chunk: any, chunkIndex: number) => {
                    const chunkId =
                      chunk.id ?? chunk.chunkId ?? `chunk${chunkIndex}`;
                    const title = chunk.titles ?? "";
                    const content = chunk.content ?? "";
                    const editState = editingChunks[doc.documentId]?.[chunkId];
                    const isEditing = !!editState;
                    return (
                      <div
                        key={chunkId}
                        className="bg-slate-700 p-4 rounded-lg border border-slate-600 flex items-center"
                      >
                        {isSelectMode && (
                          <input
                            type="checkbox"
                            className="mr-4 accent-emerald-500"
                            checked={selectedSet.has(chunkId)}
                            onChange={(e) => {
                              setSelectedChunks((prev) => {
                                const set = new Set(prev[doc.documentId] || []);
                                if (e.target.checked) set.add(chunkId);
                                else set.delete(chunkId);
                                return { ...prev, [doc.documentId]: set };
                              });
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            {isEditing ? (
                              <Input
                                value={editState.title ?? ""}
                                onChange={(e) =>
                                  updateEditingChunk(
                                    doc.documentId,
                                    chunkId,
                                    "title",
                                    e.target.value
                                  )
                                }
                                className="text-md font-semibold bg-slate-800 text-white border-slate-600 w-1/2"
                              />
                            ) : (
                              <span className="text-md font-semibold">
                                {title || "Untitled"}
                              </span>
                            )}
                            {isEditing ? (
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    saveChunk(doc.documentId, chunkId)
                                  }
                                  disabled={Boolean(
                                    !editState.dirty ||
                                      (loadingChunk &&
                                        loadingChunk.docId === doc.documentId &&
                                        loadingChunk.chunkId === chunkId)
                                  )}
                                >
                                  {loadingChunk &&
                                  loadingChunk.docId === doc.documentId &&
                                  loadingChunk.chunkId === chunkId
                                    ? "Saving..."
                                    : "Save"}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    resetChunk(doc.documentId, chunk)
                                  }
                                  disabled={Boolean(
                                    loadingChunk &&
                                      loadingChunk.docId === doc.documentId &&
                                      loadingChunk.chunkId === chunkId
                                  )}
                                >
                                  Reset
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  startEditChunk(doc.documentId, chunk)
                                }
                              >
                                Edit Chunk
                              </Button>
                            )}
                          </div>
                          {isEditing ? (
                            <textarea
                              value={editState.content ?? ""}
                              onChange={(e) =>
                                updateEditingChunk(
                                  doc.documentId,
                                  chunkId,
                                  "content",
                                  e.target.value
                                )
                              }
                              className="w-full bg-slate-800 text-white border border-slate-600 rounded p-2 text-sm mb-2"
                              rows={4}
                              disabled={Boolean(
                                loadingChunk &&
                                  loadingChunk.docId === doc.documentId &&
                                  loadingChunk.chunkId === chunkId
                              )}
                            />
                          ) : (
                            <div className="text-slate-300 whitespace-pre-line text-sm">
                              {content}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })
        )}
        {/* Global submit/reset panel */}
        {Object.keys(editingChunks).length > 0 && (
          <div className="fixed bottom-8 right-8 bg-slate-800 border border-slate-600 rounded-lg p-4 shadow-lg z-50">
            <div className="mb-2 text-white font-bold">
              You have unsaved chunk edits
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={submitAll}
                disabled={loadingAll}
              >
                {loadingAll ? "Submitting..." : "Submit All"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAll}
                disabled={loadingAll}
              >
                Reset All
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Modal for adding chunk */}
      {addModal.open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Add Chunk</h2>
            <div className="mb-3">
              <label className="block text-sm text-slate-300 mb-1">Title</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
                value={addChunkData.title}
                onChange={(e) =>
                  setAddChunkData((data) => ({
                    ...data,
                    title: e.target.value,
                  }))
                }
                placeholder="Section Title"
                disabled={addLoading}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm text-slate-300 mb-1">
                Content
              </label>
              <textarea
                className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
                value={addChunkData.content}
                onChange={(e) =>
                  setAddChunkData((data) => ({
                    ...data,
                    content: e.target.value,
                  }))
                }
                rows={4}
                placeholder="Chunk content here"
                disabled={addLoading}
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddChunkSubmit}
                disabled={
                  addLoading || !addChunkData.title || !addChunkData.content
                }
              >
                {addLoading ? "Adding..." : "Submit"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAddModal({ open: false, docId: undefined })}
                disabled={addLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Add Document Modal */}
      {addDocModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Add Document</h2>
            {!docType && (
              <div className="flex space-x-4 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDocType("url")}
                >
                  URL Based Doc
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDocType("file")}
                >
                  Document Based Doc
                </Button>
              </div>
            )}
            {docType === "url" && (
              <div className="mb-4">
                <label className="block text-sm text-slate-300 mb-1">
                  Document URL
                </label>
                <Input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com"
                  disabled={addDocLoading}
                  className="mb-2"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddDoc}
                  disabled={addDocLoading || !urlInput}
                >
                  {addDocLoading ? "Adding..." : "Submit"}
                </Button>
              </div>
            )}
            {docType === "file" && (
              <div className="mb-4">
                <label className="block text-sm text-slate-300 mb-1">
                  Upload Document
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFileInput(e.target.files?.[0] || null)}
                  disabled={addDocLoading}
                  className="mb-2"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddDoc}
                  disabled={addDocLoading || !fileInput}
                >
                  {addDocLoading ? "Uploading..." : "Submit"}
                </Button>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setAddDocModal(false);
                setDocType(null);
                setUrlInput("");
                setFileInput(null);
              }}
              disabled={addDocLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
