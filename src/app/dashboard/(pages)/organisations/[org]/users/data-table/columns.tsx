import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database } from "@/types/database.types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

type OrgUsers = Database["public"]["Views"]["user_organizations"]["Row"];
type AppUser = Database["public"]["Views"]["app_users_view"]["Row"];

type OrgUserWithAppUser = OrgUsers & { app_user_data?: AppUser };

export const columns: ColumnDef<OrgUserWithAppUser>[] = [
  {
    accessorKey: "user_role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("user_role") as string;
      return <span className={`badge badge-${role}`}>{role}</span>;
    },
  },
  {
    accessorFn: (row) => row.app_user_data?.email ?? "N/A",
    id: "user_email",
    header: "User Email",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorFn: (row) => row.application_name ?? "N/A",
    id: "user_application",
    header: "User Application",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorFn: (row) => row.app_user_data?.created_at ?? null,
    id: "created_at",
    header: "User Created At",
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      if (!value) return <span>N/A</span>;
      const date = new Date(value);
      return <span>{date.toLocaleString()}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const handleRemoveUser = (id: string) => {
        // Logic to remove user
        toast("User removed from application " + row.original.application_name);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Button
                disabled={row.original.user_role === "superadmin"}
                variant="ghost"
                className="w-full justify-start"
                onClick={() =>
                  handleRemoveUser(row.original.app_user_data?.id!)
                }
              >
                <Trash className="text-red-500" /> Remove User
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
