import { useCallback, useEffect, useState } from "react";
import type { PaginatedResponse, QueryParams } from "@/types/api";

interface UsePaginatedOptions<T> {
  fetcher: (params: QueryParams) => Promise<PaginatedResponse<T>>;
  initialParams?: QueryParams;
  pageSize?: number;
}

export function usePaginated<T>({ fetcher, initialParams = {}, pageSize = 10 }: UsePaginatedOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<QueryParams>(initialParams);

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetcher({ ...params, page, page_size: pageSize });
      setData(res.results);
      setCount(res.count);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados.");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [fetcher, params, page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateParams = useCallback((newParams: Partial<QueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
    setPage(1);
  }, []);

  return {
    data,
    count,
    page,
    setPage,
    totalPages,
    loading,
    error,
    params,
    updateParams,
    refetch: fetchData,
  };
}
