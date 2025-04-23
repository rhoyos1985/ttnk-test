import { useEffect, useState } from "react";
import { TransactionType } from "../types";

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionType[]
  >([]);
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [paginatedTransaction, setPaginatedTransaction] = useState<
    TransactionType[]
  >([]);

  const ITEMS_PER_PAGE = 5;

  const getTransactions = async () => {
    try {
      const mockApiURL: string =
        "https://68080777942707d722dd23bd.mockapi.io/payment/api/v1/payment-transactions";
      const method = "GET";

      const response = await fetch(mockApiURL, {
        method: method,
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result: TransactionType[] =
        (await response.json()) as TransactionType[];
      setTransactions(result);
      setFilteredTransactions(result);
    } catch (error) {
      console.error({ error });
      setError("Failed to fetch transactions. Please try again.");
    }
  };

  const handleTrxFilter = () => {
    if (!startDate || !endDate) {
      setFilteredTransactions(transactions);
      return;
    }
    const filtered = transactions.filter((trx: TransactionType) => {
      const txDate = new Date(trx.transactionDate);
      return txDate >= new Date(startDate) && txDate <= new Date(endDate);
    });
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const handleTrxSort = (field: "date" | "amount") => {
    const sorted = [...filteredTransactions].sort(
      (a: TransactionType, b: TransactionType) => {
        if (field === "date") {
          return (
            new Date(a.transactionDate).getTime() -
            new Date(b.transactionDate).getTime()
          );
        } else {
          return a.amount - b.amount;
        }
      },
    );
    setFilteredTransactions(sorted);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    if (filteredTransactions.length) {
      const getTotalPage = Math.ceil(
        filteredTransactions.length / ITEMS_PER_PAGE,
      );
      setTotalPage(getTotalPage);
    }
  }, [filteredTransactions]);

  useEffect(() => {
    const paginateTrx = filteredTransactions.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
    setPaginatedTransaction(paginateTrx);
  }, [currentPage]);

  return {
    filteredTransactions,
    error,
    currentPage,
    setCurrentPage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    totalPage,
    paginatedTransaction,
    handleTrxFilter,
    handleTrxSort,
  };
};
