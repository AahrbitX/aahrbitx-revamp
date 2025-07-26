import { Database } from "@/types/database.types";
import { ColumnDef } from "@tanstack/react-table";

type OrgUsers = Database["public"]["Views"]["organisation_user_view"]["Row"];

export const columns: ColumnDef<OrgUsers>[] = [
  {
    accessorKey: "user_role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("user_role") as string;
      return <span className={`badge badge-${role}`}>{role}</span>;
    },
  },
];
