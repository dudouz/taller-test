"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";

import { Transaction } from "@/types/transaction";

import { DatePicker } from "@/components/ui/date-picker";
import { filterTransactionsByDateRange } from "@/lib/utils";
import { isBefore } from "date-fns";
import {
  columns,
  TransactionsTable,
} from "./transactions/components/TransactionsTable";

export default function TransactionsList() {
  const { toast } = useToast();
  const [currentTransactions, setCurrentTransactions] = React.useState<
    Transaction[]
  >([]);
  const [filteredData, setFilteredData] =
    React.useState<Transaction[]>(currentTransactions);

  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
  const [loading, setIsLoading] = React.useState(true);

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setFilteredData(currentTransactions);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      let result;

      try {
        result = await fetch("api/transactions");
      } catch {
        toast({
          title: "Error fetching transactions",
          description:
            "There was an error while fetching your transactions, try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }

      if (result) {
        const { transactions } = await result.json();

        setCurrentTransactions(transactions);
        setFilteredData(transactions);
      }
    };

    fetchData();
  }, [toast]);

  React.useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    const isStartDateBeforeEndDate = isBefore(start, end);

    if (!isStartDateBeforeEndDate) {
      toast({
        title: "Wrong date range",
        description: "Please provide an end date after the start date.",
        variant: "destructive",
      });

      return;
    }

    const filtered = filterTransactionsByDateRange(
      currentTransactions as Transaction[],
      start,
      end
    );

    setFilteredData(filtered);
  }, [startDate, endDate, toast, currentTransactions]);

  return (
    <section className="flex flex-col min-w-screen min-h-screen  p-10 gap-5 ">
      <header className="flex w-full justify-between items-center">
        <h1 className="text-3xl font-bold">Transactions List</h1>
      </header>

      {loading ? (
        <span> Loading Data </span>
      ) : (
        <div className="w-full h-full">
          <div className="flex gap-2  w-full min-h-[70px] flex-col mb-5">
            <div className="flex gap-2 items-center">
              <span>Filter By Date</span>

              <span
                className="text-xs px-2 py-1 hover:text-white hover:bg-slate-400 transition-all rounded-xl cursor-pointer"
                onClick={() => clearFilters()}
              >
                Clear Filter
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex  flex-col">
                <label className="text-sm" htmlFor="start-date">
                  Start Date
                </label>
                <DatePicker date={startDate} setDate={setStartDate} />
              </div>

              <div className="flex  flex-col">
                <label className="text-sm" htmlFor="end-date">
                  End Date
                </label>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>
            </div>
          </div>

          <TransactionsTable<Transaction, Transaction>
            data={filteredData}
            columns={columns}
          />
        </div>
      )}
    </section>
  );
}
