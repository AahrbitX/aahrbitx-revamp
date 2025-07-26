"use client";

import { deleteOrganization } from "@/actions/organizations/delete/deleteOrganization";
import { Button } from "@/components/ui/button";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { redirect, useParams } from "next/navigation";
import { toast } from "sonner";

export const DeleteOrganization = () => {
  const { user } = useAuthOrg();
  const params = useParams();

  const org = params.org;
  const userId = user?.id;

  if (!org) return;

  const handleDelete = async () => {
    if (!userId) return;

    const orgId = Array.isArray(org) ? org[0] : org;
    toast.promise(deleteOrganization(userId, orgId), {
      loading: "Deleting organization...",
      success: "Organization deleted successfully",
      error: "Unable to delete organization",
    });

    redirect("/dashboard");
  };

  return (
    <Button type="button" variant={"destructive"} onClick={handleDelete}>
      Delete Organization
    </Button>
  );
};
