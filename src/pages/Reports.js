import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    const { data } = await api.get("/reports");
    setReports(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    await api.post("/reports/generate", {
      start_date: "2024-01-01",
      end_date: "2024-12-31",
    });
    fetchReports();
  };

  return (
    <div className="p-6">
      <button
        onClick={handleGenerate}
        className="bg-teal-500 text-white px-4 py-2 rounded mb-4"
      >
        Generate Report
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-disc list-inside">
          {reports.map((r) => (
            <li key={r.id}>
              {r.start_date} – {r.end_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
