// ===== Auth =====
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh?: string;
}

// ===== Lead =====
export type LeadStatus = "novo" | "contacto" | "visita" | "negociacao" | "fechado" | "perdido";

export interface Lead {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  origem: string;
  agente: string;
  status: LeadStatus;
  imovel: string;
  valor: number;
  notas: string;
  created_at: string;
  updated_at: string;
}

export interface LeadCreate {
  nome: string;
  email: string;
  telefone: string;
  origem?: string;
  agente?: string;
  status?: LeadStatus;
  imovel?: string;
  valor?: number;
  notas?: string;
}

// ===== Property =====
export type PropertyStatus = "disponivel" | "reservado" | "vendido";

export interface Property {
  id: number;
  titulo: string;
  endereco: string;
  tipo: string;
  valor: number;
  status: PropertyStatus;
  proprietario: string;
  agente: string;
  quartos: number;
  area: number;
  descricao: string;
  fotos: string[];
  created_at: string;
  updated_at: string;
}

export interface PropertyCreate {
  titulo: string;
  endereco: string;
  tipo: string;
  valor: number;
  status?: PropertyStatus;
  proprietario?: string;
  agente?: string;
  quartos?: number;
  area?: number;
  descricao?: string;
}

// ===== Client =====
export interface Client {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  tipo: "comprador" | "proprietario";
  endereco?: string;
  notas?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientCreate {
  nome: string;
  email: string;
  telefone: string;
  documento?: string;
  tipo: "comprador" | "proprietario";
  endereco?: string;
  notas?: string;
}

// ===== Pagination =====
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ===== Error =====
export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}

// ===== Query Params =====
export interface QueryParams {
  search?: string;
  status?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
  [key: string]: string | number | undefined;
}
