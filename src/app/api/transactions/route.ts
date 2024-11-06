import { Transaction } from "@/types/transaction";
import { NextResponse } from "next/server";

const transactions: Transaction[] = [
  {
    id: "trx-1a2b3c",
    amount: 150.75,
    date: "2024-10-12",
    description: "Grocery shopping",
  },
  {
    id: "trx-4d5e6f",
    amount: -75.0,
    date: "2024-09-22",
    description: "Rent payment",
  },
  {
    id: "trx-7g8h9i",
    amount: 200.0,
    date: "2024-08-15",
    description: "Bank transfer",
  },
  {
    id: "trx-0j1k2l",
    amount: -50.25,
    date: "2024-07-20",
    description: "Online purchase",
  },
  {
    id: "trx-3m4n5o",
    amount: -20.0,
    date: "2024-06-10",
    description: "Gym payment",
  },
  {
    id: "trx-6p7q8r",
    amount: 15.0,
    date: "2024-05-05",
    description: "Reimbursement",
  },
  {
    id: "trx-9s0t1u",
    amount: -100.5,
    date: "2024-04-18",
    description: "Electricity bill",
  },
  {
    id: "trx-2v3w4x",
    amount: -12.99,
    date: "2024-03-25",
    description: "Streaming subscription",
  },
  {
    id: "trx-5y6z7a",
    amount: -25.0,
    date: "2024-02-14",
    description: "Book purchase",
  },
  {
    id: "trx-8b9c0d",
    amount: 1200.0,
    date: "2024-01-31",
    description: "Salary deposit",
  },
];

export async function GET() {
  return NextResponse.json({ transactions });
}
