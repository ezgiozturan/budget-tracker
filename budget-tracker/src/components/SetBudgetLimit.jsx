import { setBudgetLimit } from "@/redux/budgetSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function SetBudgetLimit() {
  const categories = ["Yemek", "Ulaşım", "Eğlence", "Vergi", "Sağlık"];
  const budgetLimits = useSelector((state) => state.budget.budgetLimits);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [limit, setLimit] = useState("");
  const dispatch = useDispatch();

  const handleSetLimit = (e) => {
    e.preventDefault();
    dispatch(
      setBudgetLimit({ category: selectedCategory, limit: parseFloat(limit) })
    );
    setLimit("");
  };

  return (
    <div className="p-4 white rounded mt-4">
      <h2 className="text-lg font-bold mb-4">Bütçe Limitini Ayarla</h2>
      <form onSubmit={handleSetLimit}>
        <div className="mb-4">
          <label className="block text-gray-700">Kategori</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Limit</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded"
        >
          Limiti Ayarla
        </button>
      </form>
      <div className="mt-4">
        <h3 className="font-bold">Belirlenen Limit:</h3>
        <ul>
          {Object.entries(budgetLimits).map(([category, limit]) => (
            <li key={category} className="border-b p-2">
              {category}: {limit} tl
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
