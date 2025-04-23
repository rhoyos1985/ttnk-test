import styled from "styled-components";
import { TransactionListProps } from "./transaction.props";
import { TransactionType } from "../../types";

const TransactionContentTable = styled.div`
  overflow-x: auto;
`;

const TransactionTable = styled.table`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const TransactionThead = styled.thead`
  background-color: #f0f0f0;
`;

const TransactionTh = styled.th`
  padding: 1rem;
  text-align: center;
  cursor: pointer;
`;

const TransactionTd = styled.td`
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #eee;
`;

const TransactionPagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TransactionListButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 5px;
  background-color: #ccc;
  cursor: pointer;
  &:hover {
    background-color: #bbb;
  }
`;

const TransactionListComponent: React.FC<TransactionListProps> = ({
  transactions,
  onSort,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <TransactionContentTable>
      <TransactionTable>
        <TransactionThead>
          <tr>
            <TransactionTh>Transaction ID</TransactionTh>
            <TransactionTh onClick={() => onSort("date")}>Date ⬍</TransactionTh>
            <TransactionTh onClick={() => onSort("amount")}>
              Amount ⬍
            </TransactionTh>
          </tr>
        </TransactionThead>
        <tbody>
          {transactions.map((trx: TransactionType) => (
            <tr>
              <TransactionTd>{trx.transactionId}</TransactionTd>
              <TransactionTd>
                {new Date(trx.transactionDate).toLocaleDateString()}
              </TransactionTd>
              <TransactionTd>{trx.description}</TransactionTd>
              <TransactionTd>{trx.amount.toFixed(2)}</TransactionTd>
            </tr>
          ))}
        </tbody>
      </TransactionTable>
      <TransactionPagination>
        <TransactionListButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </TransactionListButton>
        <span>
          page {currentPage} of {totalPages}
        </span>
        <TransactionListButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === totalPages}
        >
          Prev
        </TransactionListButton>
      </TransactionPagination>
    </TransactionContentTable>
  );
};

export default TransactionListComponent;
