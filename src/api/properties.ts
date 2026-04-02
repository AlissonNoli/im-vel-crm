import { api } from "./client";
import type { Property, PropertyCreate, PaginatedResponse, QueryParams } from "@/types/api";

const BASE = "/properties";

export const propertiesApi = {
  list(params?: QueryParams) {
    return api.get<PaginatedResponse<Property>>(`${BASE}/`, params);
  },
  get(id: number) {
    return api.get<Property>(`${BASE}/${id}/`);
  },
  create(data: PropertyCreate) {
    return api.post<Property>(`${BASE}/`, data);
  },
  update(id: number, data: Partial<PropertyCreate>) {
    return api.patch<Property>(`${BASE}/${id}/`, data);
  },
  delete(id: number) {
    return api.delete(`${BASE}/${id}/`);
  },
};
