import { addExpense, addIncome } from "@/redux/budgetSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function TransactionForm() {
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");
  const dispatch = useDispatch();

  const budgetLimits = useSelector((state) => state.budget.budgetLimits || {});
  const expenses = useSelector((state) => state.budget.expenses || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      description,
      amount: parseFloat(amount),
      date,
      category,
    };

    if (type === "expense") {
      const categoryExpenses = expenses
        .filter((expense) => expense.category === category)
        .reduce((total, expense) => total + expense.amount, 0);

      const newTotal = categoryExpenses + parseFloat(amount);

      if (budgetLimits[category] && newTotal > budgetLimits[category]) {
        alert(`Warning: You have exceeded the budget limit for ${category}!`);
        alert(`UYARI: ${category} İÇİN BELİRLENEN LİMİT AŞILDI!`);
      } else if (
        budgetLimits[category] &&
        newTotal >= budgetLimits[category] * 0.8
      ) {
        alert(`Warning: You are nearing the budget limit for ${category}!`);
        alert(`UYARI: ${category} İÇİN BELİRLENEN LİMİTE YAKLAŞTINIZ!`);
      }

      dispatch(addExpense(transaction));
    } else {
      dispatch(addIncome(transaction));
    }

    setDescription("");
    setAmount("");
    setDate("");
    setCategory("Food");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <div className="mb-4">
        <label className="block text-gray-700">İşlem Tipi</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="income">Gelir</option>
          <option value="expense">Gider</option>
        </select>
      </div>
      {type === "expense" && (
        <div className="mb-4">
          <label className="block text-gray-700">Kategori</label>
          {Object.keys(budgetLimits || {}).length === 0 ? (
            <p>Henüz bütçe limiti belirlenmemiş.</p>
          ) : (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {Object.keys(budgetLimits).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700">Açıklama</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Miktar</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tarih</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-500 rounded"
      >
        İşlem Ekle
      </button>
    </form>
  );
}
