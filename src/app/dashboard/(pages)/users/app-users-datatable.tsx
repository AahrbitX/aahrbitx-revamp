"use client";

import React from "react";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";
import { AppUser } from "@/types/App.types";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

function AppUsersDataTable({ appUsers }: { appUsers: AppUser[] }) {
  const table = useReactTable<AppUser>({
    data: appUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="mt-4">
      <DataTable columns={columns} table={table} />
    </div>
  );
}

export default AppUsersDataTable;
