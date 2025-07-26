import { getOrganisationData } from "@/actions/organizations/getOrganizationData";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import React from "react";
import { DeleteOrganization } from "./components/deleteOrganization";

async function OrgDataPage({ params }: { params: Promise<{ org: string }> }) {
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

  const handleDeleteOrganisation = async () => {
    // Implement delete organization logic here
  };

  const orgData = await getOrganisationData(currentOrg);

  if (!orgData) {
    notFound();
  }

  const currOrg = orgData[0];

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        Your Organization: {currOrg.name}
      </h1>
      {/* other content goes here  */}
      <div className="mt-4">
        <DeleteOrganization />
      </div>
    </div>
  );
}

export default OrgDataPage;
