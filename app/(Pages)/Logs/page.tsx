"use client";

import { useEffect, useState } from "react";
import { useLogs } from "@/hooks/useLogs";
import BookmarksHeader from "@/public/component/bookmark/BookmarksHeader";

export default function LogsPage() {
  const { handleFetchLogs } = useLogs();

  const [logs, setLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await handleFetchLogs();

      if (data) {
        setLogs(data);
        setFilteredLogs(data);
      }
    };

    fetchLogs();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <BookmarksHeader
        item_header="Logs"
        item_description="View all logs of your actions."
      />

      {/* SEARCH */}
      <div className="relative w-full">
        <input
          placeholder="Rechercher dans les logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {search && <button onClick={() => setSearch("")}>✕</button>}
      </div>

      {/* EMPTY STATE */}
      {filteredLogs.length === 0 ? (
        <div className="mt-6 text-gray-500">Aucun log trouvé</div>
      ) : (
        <div className="space-y-3 mt-6">
          {filteredLogs.map((log, i) => (
            <div key={i} className="p-4 bg-white rounded shadow">
              <p>{log.action_made}</p>

              {log.details && <p>{log.details}</p>}

              {log.created_at && <span>{log.created_at}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
