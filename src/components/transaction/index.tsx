import styled from "styled-components";
import TransactionFilterComponent from "./transaction-filter.component";
import TransactionSumaryComponent from "./transaction-sumary.component";
import TransactionListComponent from "./transaction-list.component";
import { useTransaction } from "../../hooks/transaction.hook";

const TransactionsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #f7f7f7;
`;

const TransactionsTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const TransactionsErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const TransactionsComponent: React.FC = () => {
  const {
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
  } = useTransaction();

  return (
    <TransactionsContainer>
      <TransactionsTitle> Payment Transactions Dashboard </TransactionsTitle>
      <TransactionFilterComponent
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        onFilter={handleTrxFilter}
      />
      {error && <TransactionsErrorMessage>{error}</TransactionsErrorMessage>}
      <TransactionSumaryComponent transactions={filteredTransactions} />
      <TransactionListComponent
        transactions={paginatedTransaction}
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={setCurrentPage}
        onSort={handleTrxSort}
      />
    </TransactionsContainer>
  );
};

export default TransactionsComponent;
