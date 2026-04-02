import { api } from "./client";
import type { Lead, LeadCreate, PaginatedResponse, QueryParams } from "@/types/api";

const BASE = "/leads";

export const leadsApi = {
  list(params?: QueryParams) {
    return api.get<PaginatedResponse<Lead>>(`${BASE}/`, params);
  },
  get(id: number) {
    return api.get<Lead>(`${BASE}/${id}/`);
  },
  create(data: LeadCreate) {
    return api.post<Lead>(`${BASE}/`, data);
  },
  update(id: number, data: Partial<LeadCreate>) {
    return api.patch<Lead>(`${BASE}/${id}/`, data);
  },
  delete(id: number) {
    return api.delete(`${BASE}/${id}/`);
  },
};
