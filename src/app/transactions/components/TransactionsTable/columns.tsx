"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Transaction } from "@/types/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-bold w-20">ID</div>,
    maxSize: 20,
    size: 20,
    minSize: 20,
  },
  {
    accessorKey: "date",

    header: ({ column }) => (
      <span
        className="cursor-pointer flex items-center font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const date = row.getValue<string>("date");

      const formatted = formatDate(date);

      return <div>{formatted}</div>;
    },
    maxSize: 500,
    size: 500,
    minSize: 500,
  },
  {
    maxSize: 500,
    size: 500,
    minSize: 500,
    accessorKey: "description",
    header: () => <div className="font-bold">Description</div>,
  },
  {
    maxSize: 500,
    size: 500,
    minSize: 500,
    accessorKey: "amount",
    header: ({ column }) => (
      <span
        className="cursor-pointer flex items-center font-bold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => {
      const value = row.getValue<number | string>("amount");
      const formatted = formatCurrency(value);

      return <div>{formatted}</div>;
    },
  },
];
