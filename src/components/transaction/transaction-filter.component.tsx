import styled from "styled-components";
import { TransactionDateFilterProps } from "./transaction.props";

const TransactionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const TransactionInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TransactionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

const TransactionFilterComponent: React.FC<TransactionDateFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFilter,
}) => {
  return (
    <TransactionContainer>
      <TransactionInput
        type="date"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
      />
      <TransactionInput
        type="date"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
      />
      <TransactionButton onClick={onFilter}>Filter</TransactionButton>
    </TransactionContainer>
  );
};

export default TransactionFilterComponent;
