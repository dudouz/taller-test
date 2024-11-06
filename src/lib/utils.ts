import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isAfter, isBefore } from "date-fns";
import { enUS } from "date-fns/locale";
import { Transaction } from "@/types/transaction";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  return format(date, "MMMM d, yyyy", { locale: enUS });
};

export const formatCurrency = (value: number | string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
};

export function filterTransactionsByDateRange(
  transactions: Transaction[],
  startDate: string,
  endDate: string
): Transaction[] {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  return transactions.filter((transaction) => {
    const transactionDate = parseISO(transaction.date);
    return isAfter(transactionDate, start) && isBefore(transactionDate, end);
  });
}
