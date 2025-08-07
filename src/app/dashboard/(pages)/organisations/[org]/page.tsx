import React from "react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getOrganisationData } from "@/actions/organizations/getOrganizationData";
import { DeleteOrganization } from "./components/deleteOrganization";
import { getProducts } from "@/actions/products/getProducts";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const orgData = await getOrganisationData(currentOrg);
  // const products = await getProducts();

  if (!orgData) {
    notFound();
  }

  const currOrg = orgData[0];

  return (
    <section id="organisation-details" className="p-4 @container">
      <div className="space-x-4 *:inline-block mb-3">
        <h1 className="text-3xl font-semibold ">{currOrg.name}</h1>
        <Badge className="border-2 border-amber-500 bg-amber-500/50 text-amber-100">
          {/* {currOrg.plan} */}
          Pro
        </Badge>
      </div>
      <div>
        <Button variant={"secondary"} asChild>
          <Link href={`/dashboard/organisations/new?orgId=${currOrg.id}`}>
            Edit Organization
          </Link>
        </Button>
      </div>
      {/* <div className="my-4">
        <h2 className="text-xl font-semibold mb-4">Applications</h2>
        <div className="grid @lg:grid-cols-2 @2xl:grid-cols-3">
          {products ? (
            products.map((product) => (
              <ProductCard key={product.id} props={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div> */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">
          Your Organization Details
        </h2>
        <p className="text-muted-foreground">
          Created at: {currOrg.created_at}
        </p>
      </div>
      {/* other content goes here  */}
      <div className="mt-4">
        <DeleteOrganization />
      </div>
    </section>
  );
}

export default OrgDataPage;
