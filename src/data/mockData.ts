// Mock data for the CRM
export type LeadStage = "novo" | "contacto" | "visita" | "negociacao" | "fechado" | "perdido";

export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  origem: string;
  agente: string;
  etapa: LeadStage;
  imovel: string;
  valor: number;
  notas: string;
  criadoEm: string;
  ultimoContacto: string;
}

export interface Imovel {
  id: string;
  titulo: string;
  endereco: string;
  tipo: string;
  valor: number;
  status: "disponivel" | "reservado" | "vendido";
  proprietario: string;
  agente: string;
  quartos: number;
  area: number;
  descricao: string;
  fotos: string[];
}

export interface Interacao {
  id: string;
  leadId: string;
  leadNome: string;
  tipo: "chamada" | "email" | "whatsapp" | "visita" | "sms";
  resumo: string;
  data: string;
  agente: string;
}

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
  { id: "1", nome: "Ana Silva", email: "ana@email.com", telefone: "+351 912 345 678", origem: "Website", agente: "João Ferreira", etapa: "novo", imovel: "T3 Cascais", valor: 450000, notas: "Interessada em moradia com jardim", criadoEm: "2024-03-20", ultimoContacto: "2024-03-20" },
  { id: "2", nome: "Pedro Santos", email: "pedro@email.com", telefone: "+351 923 456 789", origem: "Referência", agente: "Maria Costa", etapa: "contacto", imovel: "T2 Lisboa", valor: 320000, notas: "Procura apartamento centro", criadoEm: "2024-03-18", ultimoContacto: "2024-03-21" },
  { id: "3", nome: "Carla Mendes", email: "carla@email.com", telefone: "+351 934 567 890", origem: "Idealista", agente: "João Ferreira", etapa: "visita", imovel: "Moradia Sintra", valor: 580000, notas: "Visita agendada para sábado", criadoEm: "2024-03-15", ultimoContacto: "2024-03-22" },
  { id: "4", nome: "Rui Oliveira", email: "rui@email.com", telefone: "+351 945 678 901", origem: "Facebook", agente: "Maria Costa", etapa: "negociacao", imovel: "T4 Oeiras", valor: 650000, notas: "Proposta em análise", criadoEm: "2024-03-10", ultimoContacto: "2024-03-22" },
  { id: "5", nome: "Sofia Rodrigues", email: "sofia@email.com", telefone: "+351 956 789 012", origem: "Website", agente: "João Ferreira", etapa: "fechado", imovel: "T1 Alfama", valor: 280000, notas: "Escritura marcada", criadoEm: "2024-03-05", ultimoContacto: "2024-03-21" },
  { id: "6", nome: "Miguel Costa", email: "miguel@email.com", telefone: "+351 967 890 123", origem: "Imovirtual", agente: "Maria Costa", etapa: "perdido", imovel: "T2 Amadora", valor: 220000, notas: "Optou por outro imóvel", criadoEm: "2024-03-01", ultimoContacto: "2024-03-15" },
  { id: "7", nome: "Teresa Lopes", email: "teresa@email.com", telefone: "+351 978 901 234", origem: "Website", agente: "João Ferreira", etapa: "novo", imovel: "T3 Almada", valor: 350000, notas: "", criadoEm: "2024-03-22", ultimoContacto: "2024-03-22" },
  { id: "8", nome: "Bruno Almeida", email: "bruno@email.com", telefone: "+351 989 012 345", origem: "Referência", agente: "Maria Costa", etapa: "contacto", imovel: "Moradia Estoril", valor: 890000, notas: "Muito interessado, alto orçamento", criadoEm: "2024-03-19", ultimoContacto: "2024-03-22" },
];

export const mockImoveis: Imovel[] = [
  { id: "1", titulo: "T3 Cascais - Vista Mar", endereco: "Rua da Praia 45, Cascais", tipo: "Apartamento", valor: 450000, status: "disponivel", proprietario: "Manuel Sousa", agente: "João Ferreira", quartos: 3, area: 120, descricao: "Excelente apartamento T3 com vista mar", fotos: [] },
  { id: "2", titulo: "T2 Centro Lisboa", endereco: "Av. da Liberdade 123, Lisboa", tipo: "Apartamento", valor: 320000, status: "disponivel", proprietario: "Fernanda Lima", agente: "Maria Costa", quartos: 2, area: 85, descricao: "Apartamento renovado no coração de Lisboa", fotos: [] },
  { id: "3", titulo: "Moradia V4 Sintra", endereco: "Estrada de Sintra 78, Sintra", tipo: "Moradia", valor: 580000, status: "reservado", proprietario: "António Pereira", agente: "João Ferreira", quartos: 4, area: 250, descricao: "Moradia com jardim e piscina", fotos: [] },
  { id: "4", titulo: "T4 Oeiras Premium", endereco: "Rua dos Navegantes 15, Oeiras", tipo: "Apartamento", valor: 650000, status: "disponivel", proprietario: "Luísa Martins", agente: "Maria Costa", quartos: 4, area: 180, descricao: "Penthouse de luxo com terraço", fotos: [] },
  { id: "5", titulo: "T1 Alfama Renovado", endereco: "Travessa do Fado 8, Lisboa", tipo: "Apartamento", valor: 280000, status: "vendido", proprietario: "José Gomes", agente: "João Ferreira", quartos: 1, area: 55, descricao: "Estúdio totalmente renovado em Alfama", fotos: [] },
];

export const mockInteracoes: Interacao[] = [
  { id: "1", leadId: "3", leadNome: "Carla Mendes", tipo: "chamada", resumo: "Confirmação da visita ao imóvel em Sintra", data: "2024-03-22 14:30", agente: "João Ferreira" },
  { id: "2", leadId: "4", leadNome: "Rui Oliveira", tipo: "email", resumo: "Envio de proposta comercial T4 Oeiras", data: "2024-03-22 11:00", agente: "Maria Costa" },
  { id: "3", leadId: "2", leadNome: "Pedro Santos", tipo: "whatsapp", resumo: "Envio de fotos do apartamento T2 Lisboa", data: "2024-03-21 16:45", agente: "Maria Costa" },
  { id: "4", leadId: "1", leadNome: "Ana Silva", tipo: "chamada", resumo: "Primeiro contacto - interessada no T3 Cascais", data: "2024-03-20 10:00", agente: "João Ferreira" },
  { id: "5", leadId: "5", leadNome: "Sofia Rodrigues", tipo: "visita", resumo: "Visita final ao T1 Alfama - cliente aprovou", data: "2024-03-19 15:00", agente: "João Ferreira" },
];

export const chartData = [
  { dia: "01 Mar", leads: 3, conversoes: 1 },
  { dia: "05 Mar", leads: 5, conversoes: 2 },
  { dia: "10 Mar", leads: 4, conversoes: 1 },
  { dia: "15 Mar", leads: 7, conversoes: 3 },
  { dia: "20 Mar", leads: 6, conversoes: 2 },
  { dia: "22 Mar", leads: 8, conversoes: 4 },
];
