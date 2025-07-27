"use client";

import { deleteApplication } from "@/actions/organizations/delete/deleteApplication";
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

export const DeleteApplication = () => {
  const { user } = useAuthOrg();
  const params = useParams();
  const { userOrganizationData, setUserOrganizationData } = useAuthOrg();

  const app = params.app;
  const userId = user?.id;

  if (!app) return;
  const appId = Array.isArray(app) ? app[0] : app;

  const currUserRole = userOrganizationData.find(
    (org) => org.application_id === appId
  )?.user_role;

  if (!currUserRole || currUserRole !== "superadmin") {
    return;
  }

  const handleDelete = async () => {
    if (!userId) return;

    toast.promise(deleteApplication({ userId, appId }), {
      loading: "Deleting application...",
      success: "Application deleted successfully",
      error: "Unable to delete application",
    });

    // removing the deleting application from the state
    setUserOrganizationData(
      userOrganizationData.filter((app) => app.application_id !== appId)
    );

    redirect("/dashboard");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Application</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Application and remove your data from our servers.
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
