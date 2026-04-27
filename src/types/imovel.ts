/**
 * Modelo completo de Imóvel (Odoo-like) — usado pelo formulário com 7 abas.
 * Mantém-se separado de types/api.ts para não quebrar a integração existente.
 */

// ===== Enums =====
export type ImovelStage =
  | "draft"
  | "available"
  | "reserved"
  | "under_proposal"
  | "sold"
  | "rented"
  | "withdrawn"
  | "archived";

export type ImovelCategoria =
  | "apartamento"
  | "moradia"
  | "terreno"
  | "comercial"
  | "escritorio"
  | "armazem"
  | "quinta"
  | "garagem";

export type Typology =
  | "T0"
  | "T1"
  | "T2"
  | "T3"
  | "T4"
  | "T5"
  | "T6"
  | "T7"
  | "T8"
  | "T9+";

export type TerrainType = "rustic" | "urban" | "other";

export type CommissionType = "percentage" | "fixed_value";

export type GatheringType = "exclusive" | "non_exclusive" | "shared";

// ===== Sub-modelos =====
export interface ImovelBusiness {
  id: string;
  business_type_id: "venda" | "arrendamento" | "trespasse" | "leasing";
  amount: number;
  negotiable: boolean;
  notes?: string;
}

export interface ImovelDivision {
  id: string;
  name: string;
  area: number;
  floor?: string;
  notes?: string;
}

export interface ImovelDescriptions {
  pt: string;
  en: string;
  fr: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
}

export interface ImovelImage {
  id: string;
  url: string;
  caption?: string;
  is_cover?: boolean;
  order?: number;
}

export interface ImovelDocument {
  id: string;
  name: string;
  url: string;
  type: "ccp" | "energy_certificate" | "land_registry" | "deed" | "plan" | "other";
  uploaded_at: string;
}

export interface ImovelStageHistoryEntry {
  id: string;
  from_stage: ImovelStage | null;
  to_stage: ImovelStage;
  user: string;
  changed_at: string;
  notes?: string;
}

// ===== Comodidades booleanas =====
export interface ImovelAmenities {
  have_elevator: boolean;
  have_suite: boolean;
  have_collection: boolean;
  have_balcony: boolean;
  have_central_heating: boolean;
  have_air_conditioning: boolean;
  have_handicap_accessibility: boolean;
  have_gated_community: boolean;
  have_equipped_kitchen: boolean;
  have_garden: boolean;
  have_fireplace: boolean;
  have_furnished: boolean;
  have_pool: boolean;
  have_terrace: boolean;
  have_security: boolean;
  have_central_aspiration: boolean;
  have_pantry: boolean;
  have_sea_view: boolean;
  have_mountain_view: boolean;
  have_city_view: boolean;
  have_last_floor: boolean;
  have_barbecue: boolean;
  have_hydromassage: boolean;
  have_electric_blinds: boolean;
  have_thermo_accumulator: boolean;
}

// ===== Imóvel completo =====
export interface Imovel {
  // Identificação
  id: number;
  ref: string;
  name: string;
  stage_id: ImovelStage;
  categ_id: ImovelCategoria;
  typology?: Typology;
  terrain_type?: TerrainType;
  condition_id?: "novo" | "usado" | "renovado" | "para_recuperar" | "em_construcao";

  // Equipa
  partner_id: string; // proprietário
  employee_id: string; // agente
  co_scheduled_id?: string; // assistente
  evaluator_id?: string;

  // Endereço
  street: string;
  door?: string;
  floor?: string;
  fraction?: string;
  zone_id?: string;
  parish_id?: string;
  county_id?: string;
  state_id?: string;
  zip?: string;
  country_id: string;
  full_address?: string;

  // Áreas e métricas
  area: number; // útil
  gross_area?: number; // bruta
  land_area?: number; // terreno
  implementationArea?: number;
  construction_year?: number;
  condo_expense?: number;

  // Características
  number_of_rooms: number;
  number_of_bathrooms: number;
  number_of_floors?: number;
  number_of_cabinets?: number;
  box_car_capacity?: number;
  parking_capacity?: number;

  // Comodidades
  amenities: ImovelAmenities;

  // Negócio
  business_ids: ImovelBusiness[];
  commission_type: CommissionType;
  commission_percentage?: number;
  commission_fixed_value?: number;
  percentage_paid_reinf?: number;
  percentage_paid_cpcv?: number;
  percentage_paid_deed?: number;
  no_share?: boolean;

  // Estrutura
  divisions?: ImovelDivision[];

  // Descrições / SEO
  description?: string; // observações internas
  public_description?: string;
  descriptions?: ImovelDescriptions;

  // Media
  images: ImovelImage[];
  youtube_link?: string;

  // Documentos
  documents: ImovelDocument[];

  // Energia
  energy_certificate_id?: "A+" | "A" | "B" | "B-" | "C" | "D" | "E" | "F" | "isento";
  energy_certificate_end?: string;
  energy_certificate_code?: string;

  // Outros
  keys_identifier?: string;
  display_board?: boolean;
  inhabited_by_owner?: boolean;
  gathering_type?: GatheringType;
  gathering_date?: string;
  gathering_end?: string;

  // Histórico
  stage_history: ImovelStageHistoryEntry[];

  // Auditoria
  created_at: string;
  updated_at: string;
}

export type ImovelCreate = Omit<Imovel, "id" | "created_at" | "updated_at" | "stage_history">;

// ===== Labels para UI =====
export const stageLabels: Record<ImovelStage, string> = {
  draft: "Rascunho",
  available: "Disponível",
  reserved: "Reservado",
  under_proposal: "Em proposta",
  sold: "Vendido",
  rented: "Arrendado",
  withdrawn: "Retirado",
  archived: "Arquivado",
};

export const stageVariants: Record<ImovelStage, "default" | "secondary" | "destructive" | "outline"> = {
  draft: "outline",
  available: "default",
  reserved: "secondary",
  under_proposal: "secondary",
  sold: "destructive",
  rented: "destructive",
  withdrawn: "outline",
  archived: "outline",
};

export const categoriaLabels: Record<ImovelCategoria, string> = {
  apartamento: "Apartamento",
  moradia: "Moradia",
  terreno: "Terreno",
  comercial: "Comercial",
  escritorio: "Escritório",
  armazem: "Armazém",
  quinta: "Quinta",
  garagem: "Garagem",
};

export const amenityLabels: Record<keyof ImovelAmenities, string> = {
  have_elevator: "Elevador",
  have_suite: "Suite",
  have_collection: "Coleção",
  have_balcony: "Varanda",
  have_central_heating: "Aquecimento central",
  have_air_conditioning: "Ar condicionado",
  have_handicap_accessibility: "Acessibilidade",
  have_gated_community: "Condomínio fechado",
  have_equipped_kitchen: "Cozinha equipada",
  have_garden: "Jardim",
  have_fireplace: "Lareira",
  have_furnished: "Mobilado",
  have_pool: "Piscina",
  have_terrace: "Terraço",
  have_security: "Segurança",
  have_central_aspiration: "Aspiração central",
  have_pantry: "Despensa",
  have_sea_view: "Vista mar",
  have_mountain_view: "Vista serra",
  have_city_view: "Vista cidade",
  have_last_floor: "Último andar",
  have_barbecue: "Churrasqueira",
  have_hydromassage: "Hidromassagem",
  have_electric_blinds: "Estores elétricos",
  have_thermo_accumulator: "Termoacumulador",
};

export const defaultAmenities: ImovelAmenities = {
  have_elevator: false,
  have_suite: false,
  have_collection: false,
  have_balcony: false,
  have_central_heating: false,
  have_air_conditioning: false,
  have_handicap_accessibility: false,
  have_gated_community: false,
  have_equipped_kitchen: false,
  have_garden: false,
  have_fireplace: false,
  have_furnished: false,
  have_pool: false,
  have_terrace: false,
  have_security: false,
  have_central_aspiration: false,
  have_pantry: false,
  have_sea_view: false,
  have_mountain_view: false,
  have_city_view: false,
  have_last_floor: false,
  have_barbecue: false,
  have_hydromassage: false,
  have_electric_blinds: false,
  have_thermo_accumulator: false,
};
