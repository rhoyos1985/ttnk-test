import { useEffect, useState } from "react";
import { TransactionType } from "../types";
import { parseLocalDate } from "../utility";
import { Order } from "../enums";

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
        headers: {
          "content-type": "application/json",
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
      const txSimpeDate = new Date(
        txDate.getFullYear(),
        txDate.getMonth(),
        txDate.getDate(),
      );
      const filterStartDate = parseLocalDate(startDate);
      const filterEndDate = parseLocalDate(endDate);
      return txSimpeDate >= filterStartDate && txSimpeDate <= filterEndDate;
    });
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const sortTransactionDate = (order: Order) => {
    const sortedTransactionsDate = [...filteredTransactions].sort(
      (a: TransactionType, b: TransactionType) => {
        const dateA = new Date(a.transactionDate);
        const dateB = new Date(b.transactionDate);

        if (order === Order.ASC) return dateA.getTime() - dateB.getTime();
        else return dateB.getTime() - dateA.getTime();
      },
    );
    setFilteredTransactions(sortedTransactionsDate);
  };

  const sortTransactionAmount = (order: Order) => {
    const sorted = [...filteredTransactions].sort(
      (a: TransactionType, b: TransactionType) => {
        const amountA = parseFloat(a.amount);
        const amountB = parseFloat(b.amount);

        if (order === Order.ASC) return amountA - amountB;
        else return amountB - amountA;
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
  }, [currentPage, filteredTransactions]);

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
    sortTransactionAmount,
    sortTransactionDate,
  };
};
