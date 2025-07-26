"use client";

import { deleteOrganization } from "@/actions/organizations/delete/deleteOrganization";
import { Button } from "@/components/ui/button";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { redirect, useParams } from "next/navigation";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const DeleteOrganization = () => {
  const { user } = useAuthOrg();
  const params = useParams();

  const org = params.org;
  const userId = user?.id;

  if (!org) return;

  const handleDelete = async () => {
    if (!userId) return;

    const { userOrganizationData } = useAuthOrg();
    const orgId = Array.isArray(org) ? org[0] : org;
    toast.promise(deleteOrganization(userId, orgId), {
      loading: "Deleting organization...",
      success: "Organization deleted successfully",
      error: "Unable to delete organization",
    });

    userOrganizationData.filter((org) => org.org_id !== orgId);

    redirect("/dashboard");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Organization</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Organisation and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
