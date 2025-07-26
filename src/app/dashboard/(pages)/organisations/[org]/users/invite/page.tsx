import React from "react";

async function InviteToOrganisationPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const routeParams = await params;
  const currentOrg = routeParams.org;

  return <div>InviteToOrganisationPage for {currentOrg}</div>;
}

export default InviteToOrganisationPage;
