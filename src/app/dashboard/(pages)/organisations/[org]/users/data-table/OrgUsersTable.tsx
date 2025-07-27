"use client";

import React, { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/app/dashboard/components/data-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Database } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type OrgUsers = Database["public"]["Views"]["user_organizations"]["Row"];
type AppUser = Database["public"]["Views"]["app_users_view"]["Row"];

type OrgUserWithAppUser = OrgUsers & { app_user_data?: AppUser };

interface ColumnFilter {
  id: string;
  value: unknown;
}
type ColumnFiltersState = ColumnFilter[];

function OrgUsersTable({
  data,
  applications,
}: {
  data: OrgUserWithAppUser[];
  applications: any[];
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable<OrgUserWithAppUser>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  const handleAppFilter = (appName: string) => {
    setColumnFilters((prev) => [
      ...prev.filter((f) => f.id !== "user_application"),
      { id: "user_application", value: appName },
    ]);
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <Filter />
              Filter By App
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {applications.map((app) => (
              <DropdownMenuItem
                key={app.id}
                onClick={() => handleAppFilter(app.application_name)}
              >
                {app.application_name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input placeholder="Search users..." className="max-w-sm" />
      </div>
      <DataTable columns={columns} table={table} />
    </div>
  );
}

export default OrgUsersTable;
