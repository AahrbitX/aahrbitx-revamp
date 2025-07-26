import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/app/dashboard/components/data-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Database } from "@/types/database.types";

type OrgUsers = Database["public"]["Views"]["organisation_user_view"]["Row"];

function OrgUsersTable({ data }: { data: OrgUsers[] }) {
  const table = useReactTable<OrgUsers>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="mt-4">
      <DataTable columns={columns} data={data} table={table} />
    </div>
  );
}

export default OrgUsersTable;
