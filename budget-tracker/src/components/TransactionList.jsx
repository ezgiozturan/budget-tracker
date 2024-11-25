import { useSelector } from "react-redux";

export default function TransactionList() {
  const { incomes, expenses } = useSelector((state) => state.budget);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Gelirler</h2>
      <ul>
        {incomes.map((income, index) => (
          <li key={index} className="border-b p-2">
            {income.description}: ${income.amount} on {income.date}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Giderler</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index} className="border-b p-2">
            {expense.description}: ${expense.amount} on {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
