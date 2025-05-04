import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/budgets").then(({ data }) => {
      setBudgets(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <Link
        to="/budgets/new"
        className="bg-teal-500 text-white px-4 py-2 rounded"
      >
        New Budget
      </Link>
      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <table className="min-w-full mt-4 table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Category ID</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Period</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{b.category_id}</td>
                <td className="border px-4 py-2">{b.amount}</td>
                <td className="border px-4 py-2">{b.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
