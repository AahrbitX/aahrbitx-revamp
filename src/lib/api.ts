const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function updateChunks(document_id: string, chunks: any) {
  const res = await fetch(`${API_BASE_URL}/update-chunks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ document_id, chunks }),
  });
  return res.json();
}

export async function editKnowledgeBase(document_id: string, updates: any) {
  const res = await fetch(`${API_BASE_URL}/edit-knowledgebase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ document_id, updates }),
  });
  return res.json();
}

export async function getChunksByOrg(client_id: string) {
  const res = await fetch(`${API_BASE_URL}/get-chunks-by-org`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id }),
  });
  return res.json();
}

export async function addChunk(document_id: string, chunk_data: { section: string; text: string }) {
  const res = await fetch(`${API_BASE_URL}/add-chunk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ document_id, chunk_data }),
  });
  return res.json();
}

export async function deleteChunks(chunk_ids: string[]) {
  const res = await fetch(`${API_BASE_URL}/delete-chunks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chunk_ids }),
  });
  return res.json();
}

export async function deepScrape(payload: any, headers: any) {
  const res = await fetch(`${API_BASE_URL}/deep-scrape`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function uploadDocument(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}