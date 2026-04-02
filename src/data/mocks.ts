/**
 * Mock data — used as fallback when the API is unavailable.
 * Set VITE_USE_MOCKS=false in .env to disable.
 */
import type { Lead, Property, Client, PaginatedResponse } from "@/types/api";

export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

// Re-export labels used by UI
export type LeadStage = "novo" | "contacto" | "visita" | "negociacao" | "fechado" | "perdido";

export const stageLabels: Record<LeadStage, string> = {
  novo: "Novo",
  contacto: "Em Contacto",
  visita: "Visita Agendada",
  negociacao: "Negociação",
  fechado: "Fechado",
  perdido: "Perdido",
};

export const stageColors: Record<LeadStage, string> = {
  novo: "pipeline-novo",
  contacto: "pipeline-contacto",
  visita: "pipeline-visita",
  negociacao: "pipeline-negociacao",
  fechado: "pipeline-fechado",
  perdido: "pipeline-perdido",
};

export const mockLeads: Lead[] = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com", telefone: "+351 912 345 678", origem: "Website", agente: "João Ferreira", status: "novo", imovel: "T3 Cascais", valor: 450000, notas: "Interessada em moradia com jardim", created_at: "2024-03-20T10:00:00Z", updated_at: "2024-03-20T10:00:00Z" },
  { id: 2, nome: "Pedro Santos", email: "pedro@email.com", telefone: "+351 923 456 789", origem: "Referência", agente: "Maria Costa", status: "contacto", imovel: "T2 Lisboa", valor: 320000, notas: "Procura apartamento centro", created_at: "2024-03-18T10:00:00Z", updated_at: "2024-03-21T10:00:00Z" },
  { id: 3, nome: "Carla Mendes", email: "carla@email.com", telefone: "+351 934 567 890", origem: "Idealista", agente: "João Ferreira", status: "visita", imovel: "Moradia Sintra", valor: 580000, notas: "Visita agendada para sábado", created_at: "2024-03-15T10:00:00Z", updated_at: "2024-03-22T10:00:00Z" },
  { id: 4, nome: "Rui Oliveira", email: "rui@email.com", telefone: "+351 945 678 901", origem: "Facebook", agente: "Maria Costa", status: "negociacao", imovel: "T4 Oeiras", valor: 650000, notas: "Proposta em análise", created_at: "2024-03-10T10:00:00Z", updated_at: "2024-03-22T10:00:00Z" },
  { id: 5, nome: "Sofia Rodrigues", email: "sofia@email.com", telefone: "+351 956 789 012", origem: "Website", agente: "João Ferreira", status: "fechado", imovel: "T1 Alfama", valor: 280000, notas: "Escritura marcada", created_at: "2024-03-05T10:00:00Z", updated_at: "2024-03-21T10:00:00Z" },
  { id: 6, nome: "Miguel Costa", email: "miguel@email.com", telefone: "+351 967 890 123", origem: "Imovirtual", agente: "Maria Costa", status: "perdido", imovel: "T2 Amadora", valor: 220000, notas: "Optou por outro imóvel", created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-15T10:00:00Z" },
  { id: 7, nome: "Teresa Lopes", email: "teresa@email.com", telefone: "+351 978 901 234", origem: "Website", agente: "João Ferreira", status: "novo", imovel: "T3 Almada", valor: 350000, notas: "", created_at: "2024-03-22T10:00:00Z", updated_at: "2024-03-22T10:00:00Z" },
  { id: 8, nome: "Bruno Almeida", email: "bruno@email.com", telefone: "+351 989 012 345", origem: "Referência", agente: "Maria Costa", status: "contacto", imovel: "Moradia Estoril", valor: 890000, notas: "Muito interessado, alto orçamento", created_at: "2024-03-19T10:00:00Z", updated_at: "2024-03-22T10:00:00Z" },
];

export const mockProperties: Property[] = [
  { id: 1, titulo: "T3 Cascais - Vista Mar", endereco: "Rua da Praia 45, Cascais", tipo: "Apartamento", valor: 450000, status: "disponivel", proprietario: "Manuel Sousa", agente: "João Ferreira", quartos: 3, area: 120, descricao: "Excelente apartamento T3 com vista mar", fotos: [], created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
  { id: 2, titulo: "T2 Centro Lisboa", endereco: "Av. da Liberdade 123, Lisboa", tipo: "Apartamento", valor: 320000, status: "disponivel", proprietario: "Fernanda Lima", agente: "Maria Costa", quartos: 2, area: 85, descricao: "Apartamento renovado no coração de Lisboa", fotos: [], created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
  { id: 3, titulo: "Moradia V4 Sintra", endereco: "Estrada de Sintra 78, Sintra", tipo: "Moradia", valor: 580000, status: "reservado", proprietario: "António Pereira", agente: "João Ferreira", quartos: 4, area: 250, descricao: "Moradia com jardim e piscina", fotos: [], created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
  { id: 4, titulo: "T4 Oeiras Premium", endereco: "Rua dos Navegantes 15, Oeiras", tipo: "Apartamento", valor: 650000, status: "disponivel", proprietario: "Luísa Martins", agente: "Maria Costa", quartos: 4, area: 180, descricao: "Penthouse de luxo com terraço", fotos: [], created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
  { id: 5, titulo: "T1 Alfama Renovado", endereco: "Travessa do Fado 8, Lisboa", tipo: "Apartamento", valor: 280000, status: "vendido", proprietario: "José Gomes", agente: "João Ferreira", quartos: 1, area: 55, descricao: "Estúdio totalmente renovado em Alfama", fotos: [], created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
];

export const mockClients: Client[] = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com", telefone: "+351 912 345 678", documento: "12345678", tipo: "comprador", created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
  { id: 2, nome: "Manuel Sousa", email: "manuel@email.com", telefone: "+351 911 111 111", documento: "23456789", tipo: "proprietario", created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
  { id: 3, nome: "Pedro Santos", email: "pedro@email.com", telefone: "+351 923 456 789", documento: "34567890", tipo: "comprador", created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
  { id: 4, nome: "Fernanda Lima", email: "fernanda@email.com", telefone: "+351 922 222 222", documento: "45678901", tipo: "proprietario", created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
  { id: 5, nome: "Carla Mendes", email: "carla@email.com", telefone: "+351 934 567 890", documento: "56789012", tipo: "comprador", created_at: "2024-03-01T10:00:00Z", updated_at: "2024-03-01T10:00:00Z" },
];

// Helper to wrap mock data in paginated response
export function mockPaginated<T>(items: T[], params?: { page?: number; page_size?: number; search?: string }): PaginatedResponse<T> {
  let filtered = items;
  const page = params?.page ?? 1;
  const pageSize = params?.page_size ?? 10;

  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = items.filter((item) => JSON.stringify(item).toLowerCase().includes(q));
  }

  const start = (page - 1) * pageSize;
  const results = filtered.slice(start, start + pageSize);

  return {
    count: filtered.length,
    next: start + pageSize < filtered.length ? `?page=${page + 1}` : null,
    previous: page > 1 ? `?page=${page - 1}` : null,
    results,
  };
}
