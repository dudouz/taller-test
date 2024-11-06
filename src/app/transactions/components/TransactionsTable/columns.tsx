"use client";

import { formatCurrency, formatDate } from "@/lib/utils";
import { Transaction } from "@/types/transaction";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: () => <span className="font-bold">ID</span>,
  },
  {
    accessorKey: "date",
    header: () => <span className="font-bold">Date</span>,
    cell: ({ row }) => {
      const date = row.getValue<string>("date");

      const formatted = formatDate(date);

      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "description",
    header: () => <span className="font-bold">Description</span>,
  },
  {
    accessorKey: "amount",
    header: () => <span className="font-bold">Amount</span>,
    cell: ({ row }) => {
      const value = row.getValue<number | string>("amount");
      const formatted = formatCurrency(value);

      return <span>{formatted}</span>;
    },
  },
];
