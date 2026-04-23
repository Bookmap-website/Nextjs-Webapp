import { useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/token";
import { server_ip } from "@/services/server_ip.config";

export function useLogs() {
  const router = useRouter();

  const handleFetchLogs = async () => {
    try {
      const token = tokenStorage.getToken();

      if (!token) {
        router.push("/Login");
        return;
      }

      const res = await fetch(server_ip + "/adminLogs/getLogs", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch logs");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      router.push("/");
    }
  };
  return { handleFetchLogs };
}
