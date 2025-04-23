import { Order } from "../../enums";
import { TransactionType } from "../../types";

export interface TransactionDateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: () => void;
}

export interface TransactionListProps extends TransactionSumaryProps {
  onSortByAmount: (order: Order) => void;
  onSortByDate: (order: Order) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface TransactionSumaryProps {
  transactions: TransactionType[];
}
