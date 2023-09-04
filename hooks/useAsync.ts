import { IServices } from "@/app/page";
import { useEffect, useState } from "react";

// const useAsync = <T>(requestFunc: () => Promise<T>) => {
const useAsync = <T>(url: string) => {
  const [data, setData] = useState<IServices[]>([]);
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<string>("idle");

  useEffect(() => {
    setStatus("pending");
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setStatus("successful");
      })
      .catch((error) => {
        setStatus("error");
        setError(error.message);
      });
  }, [url]);

  return {
    data,
    isLoading: status === "pending",
    isSuccess: status === "successful",
    isError: status === "error",
    error,
  };
};

export default useAsync;
