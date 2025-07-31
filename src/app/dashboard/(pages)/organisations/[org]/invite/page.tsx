import React from "react";

async function OrganizationInvitePage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const routeParams = await params;
  const currentOrg = routeParams.org;

  return <div>InvitePage for {currentOrg}</div>;
}

export default OrganizationInvitePage;
