"use client";

import { useEffect, useState } from "react";
import { useLogs } from "@/hooks/useLogs";

export default function LogsPage() {
  const { handleFetchLogs } = useLogs();

  const [logs, setLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // fetch logs
  useEffect(() => {
    const fetchLogs = async () => {
      const data = await handleFetchLogs();

      if (data) {
        setLogs(data);
        setFilteredLogs(data);
      }

      setLoading(false);
    };

    fetchLogs();
  }, []);

  // filter when input change in the search bar and when the logs change
  useEffect(() => {
    const query = search.toLowerCase();

    const filtered = logs.filter((log) => {
      return (
        log.action_made?.toLowerCase().includes(query) ||
        log.details?.toLowerCase().includes(query)
      );
    });

    setFilteredLogs(filtered);
  }, [search, logs]);

  // loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 animate-pulse">Chargement des logs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Logs</h1>
        <p className="text-gray-500 text-sm">
          Historique des actions effectuées
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="mt-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Rechercher dans les logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3 mt-6">
        {filteredLogs.map((log, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-gray-800 font-medium">{log.action_made}</p>

                {log.details && (
                  <p className="text-sm text-gray-500 mt-1">{log.details}</p>
                )}
              </div>

              {log.created_at && (
                <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 whitespace-nowrap">
                  {new Date(log.created_at).toLocaleString("fr-CA")}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
