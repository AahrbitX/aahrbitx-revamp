import React from "react";
import OrgUsersTable from "./data-table/OrgUsersTable";
import { getOrganisationUsers } from "@/actions/organizations/getOrganizationUsers";
import { getOrganisationApps } from "@/actions/organizations/getOrganizationApps";

async function OrgUsersPage({ params }: { params: Promise<{ org: string }> }) {
  const routeParams = await params;
  const currentOrg = routeParams.org;

  // if (!userData) {
  //   // Handle case where user data is not available
  //   return <div>User not authenticated.</div>;
  // }

  // if (user_role !== "superadmin") {
  //   // Handle non-super admin access
  //   return <div>You do not have access to this page.</div>;
  // }

  const orgAppUsers = await getOrganisationUsers(currentOrg);
  const orgApplications = await getOrganisationApps(currentOrg);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Your Organisation Users</h1>
      <div>
        <OrgUsersTable data={orgAppUsers} applications={orgApplications} />
      </div>
    </div>
  );
}

export default OrgUsersPage;
