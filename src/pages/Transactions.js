import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/transactions").then(({ data }) => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <Link
        to="/transactions/new"
        className="bg-teal-500 text-white px-4 py-2 rounded"
      >
        New Transaction
      </Link>
      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <table className="min-w-full mt-4 table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{tx.date}</td>
                <td className="border px-4 py-2">{tx.description}</td>
                <td className="border px-4 py-2">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
