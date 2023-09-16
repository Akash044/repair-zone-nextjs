import { IServices } from "@/type";
import { useEffect, useState } from "react";

type statusType = "idle" | "pending" | "success" | "error";

const useAsync = <T>(requestFunc: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<statusType>("idle");

  useEffect(() => {
    setStatus("pending");
    requestFunc()
      .then((data) => {
        setData(data);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
        setError(error.message);
      });
  }, [requestFunc]);

  return {
    data,
    isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    error,
  };
};

export default useAsync;
