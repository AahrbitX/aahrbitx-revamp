"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getApplicationData } from "@/actions/products/getApplicationData";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function WebIntegrationPage() {
  const defaultApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const [apiBase, setApiBase] = useState(defaultApiBase);
  const [clientId, setClientId] = useState("");
  const [copied, setCopied] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function fetchClientId() {
      let appId = params?.app;
      if (!appId) return;
      if (Array.isArray(appId)) {
        appId = appId[0];
      }
      try {
        const appData = await getApplicationData(appId);
        if (appData?.org_id) {
          setClientId(appData.org_id);
        }
      } catch (err) {
        // handle error
      }
    }
    fetchClientId();
  }, [params?.app]);

  const scriptTag = `
<script src="${apiBase}/static/config.js" defer></script>
<script
  src="${apiBase}/static/widget.js"
  data-client-id="${clientId}"
  defer
></script>`.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptTag).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <main className="min-h-screen bg-black text-green-400 p-6 font-mono text-sm">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-xl p-6 shadow-md space-y-4 border border-zinc-700">
        <div className="overflow-auto whitespace-pre-wrap">
          <code className="block">{scriptTag}</code>
        </div>
        <Button
          onClick={copyToClipboard}
          className="bg-zinc-800 text-white hover:bg-zinc-700 w-full flex items-center gap-2"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy Script Tag"}
        </Button>
      </div>
    </main>
  );
}
