import { useSelector } from "react-redux";

export default function BudgetLimits() {
  const budgetLimits = useSelector((state) => state.budget.budgetLimits);

  return (
    <div>
      <h1>Bütçe Limiti</h1>
      {Object.keys(budgetLimits).map((category) => (
        <p key={category}>
          {category}: {budgetLimits[category]}
        </p>
      ))}
    </div>
  );
}
