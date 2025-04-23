import { TransactionType } from "../../types";

export interface TransactionDateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: () => void;
}

export interface TransactionListProps extends TransactionSumaryProps {
  onSort: (field: "date" | "amount") => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface TransactionSumaryProps {
  transactions: TransactionType[];
}
