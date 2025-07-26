import { getApplicationData } from "@/actions/products/getApplicationData";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import React from "react";

async function AppDataPage({ params }: { params: Promise<{ app: string }> }) {
  const routeParams = await params;
  const currentApp = routeParams.app;

  // if (!userData) {
  //   // Handle case where user data is not available
  //   return <div>User not authenticated.</div>;
  // }

  // if (user_role !== "superadmin") {
  //   // Handle non-super admin access
  //   return <div>You do not have access to this page.</div>;
  // }

  const appData = await getApplicationData(currentApp);

  if (!appData) {
    notFound();
  }

  const currApp = appData[0];

  return (
    <section id="organisation-details" className="p-4 @container">
      <div className="space-x-4 *:inline-block mb-3">
        <h1 className="text-3xl font-semibold ">{currApp.application_name}</h1>
        <Badge className="border-2 border-amber-500 bg-amber-500/50 text-amber-100">
          {/* {currOrg.plan} */}
          Pro
        </Badge>
      </div>
      <div className="my-4">
        <h2>Subscribed Product</h2>
      </div>
    </section>
  );
}

export default AppDataPage;
