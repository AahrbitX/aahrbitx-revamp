const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL || "http://localhost:8000";


export async function fetchSubscriptionData(org_id: string) {
  const res = await fetch(`${PAYMENT_BASE_URL}/create-subscription/?org_id=${org_id}`);
  if (!res.ok) throw new Error("Failed to fetch subscription data");
  return await res.json();
}

export async function createOrganisation({ name, domain, plan, user_id, email, user_name }: {
  name: string,
  domain: string,
  plan: string,
  user_id: string,
  email: string,
  user_name: string
}) {
  const res = await fetch(`${API_BASE_URL}/create-client`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, domain, plan, user_id, email, user_name })
  });
  return await res.json();
}

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

export async function getChunksByOrg(org_id: string) {
  const res = await fetch(`${API_BASE_URL}/get-chunks-by-org`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ org_id }),
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

// export async function deepScrape(payload: any, headers: any) {
//   const res = await fetch(`${API_BASE_URL}/deep-scrape`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(payload),
//   });
//   return res.json();
// }

export async function uploadDocument(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}


export async function uploadFile({
  file,
  org_id,
  user_id,
  email,
  name,
  role,
  file_type,
  channel
}: {
  file: File,
  org_id: string,
  user_id: string,
  email: string,
  name: string,
  role: string,
  file_type: string,
  channel: string
}) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("org_id", org_id);
  formData.append("user_id", user_id);
  formData.append("email", email);
  formData.append("name", name);
  formData.append("role", role);
  formData.append("file_type", file_type);
  formData.append("channel", channel);

  const res = await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: formData
  });
  return await res.json();
}

export async function deepScrape({
  url,
  org_id,
  user_id,
  email,
  name,
  role,
  file_type,
  channel
}: {
  url: string,
  org_id: string,
  user_id: string,
  email: string,
  name: string,
  role: string,
  file_type: string,
  channel: string
}) {
  const res = await fetch("http://localhost:8000/deep-scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "org-id": org_id,
      "user-id": user_id,
      "email": email,
      "name": name,
      "role": role,
      "file-type": file_type,
      "channel": channel
    },
    body: JSON.stringify({ url })
  });
  return await res.json();
}

export async function getOrgUsage(org_id: string) {
  console.log("Fetching usage for org_id:", org_id);
  const res = await fetch(`${API_BASE_URL}/org-usage?org_id=${org_id}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch usage data");
  return await res.json();
}