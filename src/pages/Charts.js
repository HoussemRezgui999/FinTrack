import React, { useState } from "react";
import api from "../api/axios";

export default function Charts() {
  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState("2024-12-31");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const loadChart = async () => {
    setLoading(true);
    const response = await api.get("/charts/spending", {
      responseType: "blob",
      params: { start_date: start, end_date: end },
    });
    setUrl(URL.createObjectURL(response.data));
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex space-x-2 mb-4">
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={loadChart}
          className="bg-teal-500 text-white px-4 py-2 rounded"
        >
          Load Chart
        </button>
      </div>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        url && <img src={url} alt="Spending Chart" className="rounded shadow" />
      )}
    </div>
  );
}
