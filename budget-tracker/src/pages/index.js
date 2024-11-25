import SetBudgetLimit from "@/components/SetBudgetLimit";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Budget Tracker</h1>
      <TransactionForm />
      <TransactionList />
      <SetBudgetLimit />
    </div>
  );
}
