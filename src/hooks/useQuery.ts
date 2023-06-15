import { useEffect, useState } from "react";

export default function useQuery<TData, TError>(
  queryKey: unknown[],
  queryFn: () => Promise<any>
): [TData | null, TError | null, Boolean, Boolean] {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    queryFn()
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
        setIsLoading(false);
      });
  }, queryKey);

  return [data, error, isError, isLoading];
}
