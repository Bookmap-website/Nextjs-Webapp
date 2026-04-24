type Log = {
  action_made: string;
  details?: string;
  created_at?: string;
};

export default function LogItem({ log }: { log: Log }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-gray-800 font-medium">
            {log.action_made}
          </p>

          {log.details && (
            <p className="text-sm text-gray-500 mt-1">
              {log.details}
            </p>
          )}
        </div>

        {log.created_at && (
          <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 whitespace-nowrap">
            {new Date(log.created_at).toLocaleString("fr-CA")}
          </div>
        )}
      </div>
    </div>
  );
}