import { api } from "./client";
import type { Client, ClientCreate, PaginatedResponse, QueryParams } from "@/types/api";

const BASE = "/clients";

export const clientsApi = {
  list(params?: QueryParams) {
    return api.get<PaginatedResponse<Client>>(`${BASE}/`, params);
  },
  get(id: number) {
    return api.get<Client>(`${BASE}/${id}/`);
  },
  create(data: ClientCreate) {
    return api.post<Client>(`${BASE}/`, data);
  },
  update(id: number, data: Partial<ClientCreate>) {
    return api.patch<Client>(`${BASE}/${id}/`, data);
  },
  delete(id: number) {
    return api.delete(`${BASE}/${id}/`);
  },
};
