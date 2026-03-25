export type Role = "Admin" | "Agent" | "Assistant_Co" | "Coordinator" | "Manager";

export interface Utilizador {
  nome: string;
  email: string;
  role: Role;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  codigoPostal?: string;
  cargo?: string;
  observacoes?: string;
}

export const allPermissions = [
  "Pode ver todos os prospetos",
  "Pode editar imóveis",
  "Pode gerir permissões",
  "Pode ver relatórios",
  "Pode ver prospetos próprios",
  "Pode criar agendamentos",
  "Pode editar proprietários",
  "Pode editar compradores",
];

export const defaultPermissionsByRole: Record<Role, string[]> = {
  Admin: allPermissions,
  Agent: ["Pode ver prospetos próprios", "Pode criar agendamentos"],
  Assistant_Co: ["Pode ver prospetos próprios", "Pode criar agendamentos", "Pode editar imóveis"],
  Coordinator: ["Pode ver todos os prospetos", "Pode ver relatórios", "Pode criar agendamentos", "Pode editar imóveis"],
  Manager: ["Pode ver todos os prospetos", "Pode ver relatórios", "Pode gerir permissões", "Pode editar imóveis"],
};

export const utilizadores: Utilizador[] = [
  { nome: "Alisson Noli", email: "despi.661@gmail.com", role: "Admin", telefone: "+351 912 345 678", endereco: "Rua das Flores, 123", cidade: "Lisboa", codigoPostal: "1000-001", cargo: "Diretor" },
  { nome: "Administrador", email: "administrador@administrador.com", role: "Admin", telefone: "+351 913 000 000", endereco: "Av. da Liberdade, 50", cidade: "Lisboa", codigoPostal: "1250-001", cargo: "Administrador" },
  { nome: "Agente", email: "agente@agente.com", role: "Agent", telefone: "+351 914 000 000", endereco: "Rua Augusta, 10", cidade: "Porto", codigoPostal: "4000-001", cargo: "Consultor Imobiliário" },
  { nome: "Assistente Co", email: "assistenteco@assistenteco.com", role: "Assistant_Co", telefone: "+351 915 000 000", endereco: "Rua do Carmo, 5", cidade: "Coimbra", codigoPostal: "3000-001", cargo: "Assistente Comercial" },
  { nome: "Coordenador", email: "coordenador@coordenador.com", role: "Coordinator", telefone: "+351 916 000 000", endereco: "Praça da República, 8", cidade: "Braga", codigoPostal: "4700-001", cargo: "Coordenador de Equipa" },
  { nome: "Gestor", email: "gestor@gestor.com", role: "Manager", telefone: "+351 917 000 000", endereco: "Rua do Comércio, 22", cidade: "Faro", codigoPostal: "8000-001", cargo: "Gestor Comercial" },
];

export const roleLabels: Record<Role, string> = {
  Admin: "Administrador",
  Agent: "Agente",
  Assistant_Co: "Assistente Co",
  Coordinator: "Coordenador",
  Manager: "Gestor",
};
