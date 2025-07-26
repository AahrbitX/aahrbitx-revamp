"use client";

import { AppUser } from "@/types/App.types";
import { ColumnDef } from "@tanstack/react-table";
import { AuthProviderIcon } from "./auth-provider-icons";
import { RoleBadge } from "./user-role-icons";

export const columns: ColumnDef<AppUser>[] = [
  {
    accessorKey: "app_role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("app_role") as string;
      return <RoleBadge role={role} />;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "raw_app_meta_data",
    header: "Auth Provider",
    cell: ({ row }) => {
      const meta = row.getValue("raw_app_meta_data") as {
        providers?: string[];
      };
      return (
        <div className="flex items-center gap-1">
          {meta.providers?.map((provider) => (
            <AuthProviderIcon key={provider} provider={provider} />
          ))}
        </div>
      );
    },
  },
];
