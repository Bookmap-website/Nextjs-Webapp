"use client";

import { useEffect, useState } from "react";
import { useLogs } from "@/hooks/useLogs";

export default function LogsPage() {
  const { handleFetchLogs } = useLogs();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await handleFetchLogs();

      if (data) setLogs(data);

      setLoading(false);
    };

    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 animate-pulse">Chargement des logs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Header */}
      <div className=" mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Logs</h1>
        <p className="text-gray-500 text-sm">
          Historique des actions effectuées
        </p>
      </div>

      {/* Empty state */}
      {logs.length === 0 ? (
        <div className=" bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
          Aucun log trouvé.
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Message */}
                <div>
                  <p className="text-gray-800 font-medium">
                    {log.action_made}
                  </p>

                  {/* optionnel: détails */}
                  {log.details && (
                    <p className="text-sm text-gray-500 mt-1">
                      {log.details}
                    </p>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}