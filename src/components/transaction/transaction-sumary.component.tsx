import styled from "styled-components";
import { TransactionSumaryProps } from "./transaction.props";
import { TransactionType } from "../../types";

const TransactionSumaryContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const TransactionSumaryText = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: black;
`;

const TransactionSumaryComponent: React.FC<TransactionSumaryProps> = ({
  transactions,
}) => {
  const totalAmount = transactions.reduce(
    (sum: number, trx: TransactionType) => sum + parseFloat(trx.amount),
    0,
  );
  return (
    <TransactionSumaryContainer>
      <TransactionSumaryText>
        Total Transactions: {transactions.length}
      </TransactionSumaryText>
      <TransactionSumaryText>
        Total Amount: ${totalAmount.toFixed(2)}
      </TransactionSumaryText>
    </TransactionSumaryContainer>
  );
};

export default TransactionSumaryComponent;
