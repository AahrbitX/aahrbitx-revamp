import React from "react";
import { InviteForm } from "./invite-form";
import { getOrganisationApps } from "@/actions/organizations/getOrganizationApps";

async function OrganizationInvitePage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const routeParams = await params;
  const currentOrg = routeParams.org;

  // Fetch applications for the organization
  const apps = await getOrganisationApps(currentOrg);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Invite Users to Your Organization</h1>
      <div className=" rounded-lg max-w-lg my-4">
        <InviteForm applications={apps} orgId={currentOrg} />
      </div>
    </div>
  );
}

export default OrganizationInvitePage;
