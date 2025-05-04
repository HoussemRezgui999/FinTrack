import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/categories").then(({ data }) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <Link
        to="/categories/new"
        className="bg-teal-500 text-white px-4 py-2 rounded"
      >
        New Category
      </Link>
      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <table className="min-w-full mt-4 table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{c.id}</td>
                <td className="border px-4 py-2">{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
