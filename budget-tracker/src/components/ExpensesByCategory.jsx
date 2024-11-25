import { useSelector } from "react-redux";

export default function ExpensesByCategory() {
  const expenses = useSelector((state) => state.budget.expenses || []);

  const groupedExpenses = expenses.reduce((groups, expense) => {
    const { category } = expense;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(expense);
    return groups;
  }, {});

  return (
    <div className="p-4 black rounded shadow">
      <h2 className="text-xl font-bold mb-4">Kategorilere Göre Harcamalar</h2>
      {Object.keys(groupedExpenses).length === 0 ? (
        <p>Harcama yok.</p>
      ) : (
        <div>
          {Object.entries(groupedExpenses).map(([category, expenses]) => (
            <div key={category} className="mb-4">
              <h3 className="text-lg font-semibold text-blue-600">
                {category}
              </h3>
              <ul className="list-disc ml-5">
                {expenses.map((expense, index) => (
                  <li key={index}>
                    {expense.description}: {expense.amount} tl - {expense.date}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
