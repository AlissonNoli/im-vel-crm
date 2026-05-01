import {
  LayoutDashboard,
  Users,
  Building2,
  UserCheck,
  UserPlus,
  CalendarDays,
  BarChart3,
  Settings,
  User,
  Shield,
  UserCog,
  ChevronDown,
  CircleDot,
  Phone,
  Eye,
  Handshake,
  CheckCircle2,
  XCircle,
  Home,
  Key,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const prospectosSubItems = [
  { title: "Todos", url: "/prospectos", icon: Users },
  { title: "Novo", url: "/prospectos?status=novo", icon: CircleDot },
  { title: "Em contacto", url: "/prospectos?status=em_contacto", icon: Phone },
  { title: "Visita agendada", url: "/prospectos?status=visita_agendada", icon: Eye },
  { title: "Negociação", url: "/prospectos?status=negociacao", icon: Handshake },
  { title: "Fechado", url: "/prospectos?status=fechado", icon: CheckCircle2 },
  { title: "Perdido", url: "/prospectos?status=perdido", icon: XCircle },
];

const imoveisSubItems = [
  { title: "Todos", url: "/imoveis", icon: Building2 },
  { title: "Disponível", url: "/imoveis?status=disponivel", icon: Home },
  { title: "Reservado", url: "/imoveis?status=reservado", icon: Key },
  { title: "Vendido", url: "/imoveis?status=vendido", icon: CheckCircle2 },
  { title: "Em avaliação", url: "/imoveis?status=em_avaliacao", icon: FileText },
];

const clientesSubItems = [
  { title: "Compradores", url: "/compradores", icon: ShoppingCart },
  { title: "Proprietários", url: "/proprietarios", icon: Home },
];

const configSubItems = [
  { title: "Perfil", url: "/configuracoes/perfil", icon: User },
  { title: "Utilizadores", url: "/configuracoes/utilizadores", icon: Users },
  { title: "Permissões por Grupo", url: "/configuracoes/permissoes-grupo", icon: Shield },
  { title: "Permissões por Utilizador", url: "/configuracoes/permissoes-utilizador", icon: UserCog },
];

interface CollapsibleMenuProps {
  label: string;
  icon: React.ElementType;
  subItems: { title: string; url: string; icon: React.ElementType }[];
  isActive: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collapsed: boolean;
}

function CollapsibleMenu({ label, icon: Icon, subItems, isActive, open, onOpenChange, collapsed }: CollapsibleMenuProps) {
  return (
    <SidebarMenuItem>
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className={`w-full hover:bg-sidebar-accent cursor-pointer ${isActive ? "text-sidebar-primary font-medium" : ""}`}
          >
            <Icon className="mr-2 h-4 w-4" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{label}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </>
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        {!collapsed && (
          <CollapsibleContent>
            <SidebarMenu className="ml-4 mt-1 border-l border-sidebar-border pl-2 space-y-0.5">
              {subItems.map((sub) => (
                <SidebarMenuItem key={sub.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={sub.url}
                      end
                      className="hover:bg-sidebar-accent text-sm"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <sub.icon className="mr-2 h-3.5 w-3.5" />
                      <span>{sub.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        )}
      </Collapsible>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const path = location.pathname + location.search;

  const isProspectosActive = location.pathname.startsWith("/prospectos") || location.pathname === "/leads/new";
  const isImoveisActive = location.pathname.startsWith("/imoveis");
  const isClientesActive = location.pathname.startsWith("/compradores") || location.pathname.startsWith("/proprietarios") || location.pathname.startsWith("/clientes");
  const isConfigActive = location.pathname.startsWith("/configuracoes");

  const [prospectosOpen, setProspectosOpen] = useState(isProspectosActive);
  const [imoveisOpen, setImoveisOpen] = useState(isImoveisActive);
  const [clientesOpen, setClientesOpen] = useState(isClientesActive);
  const [configOpen, setConfigOpen] = useState(isConfigActive);

  useEffect(() => {
    if (isProspectosActive) setProspectosOpen(true);
    if (isImoveisActive) setImoveisOpen(true);
    if (isClientesActive) setClientesOpen(true);
    if (isConfigActive) setConfigOpen(true);
  }, [isProspectosActive, isImoveisActive, isClientesActive, isConfigActive]);

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-semibold text-sidebar-primary-foreground">CRM Imobiliário</h1>
              <p className="text-xs text-sidebar-foreground/60">Gestão de Imóveis</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" end className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Prospectos */}
              <CollapsibleMenu
                label="Prospectos"
                icon={Users}
                subItems={prospectosSubItems}
                isActive={isProspectosActive}
                open={prospectosOpen}
                onOpenChange={setProspectosOpen}
                collapsed={collapsed}
              />

              {/* Imóveis */}
              <CollapsibleMenu
                label="Imóveis"
                icon={Building2}
                subItems={imoveisSubItems}
                isActive={isImoveisActive}
                open={imoveisOpen}
                onOpenChange={setImoveisOpen}
                collapsed={collapsed}
              />

              {/* Clientes */}
              <CollapsibleMenu
                label="Clientes"
                icon={UserCheck}
                subItems={clientesSubItems}
                isActive={isClientesActive}
                open={clientesOpen}
                onOpenChange={setClientesOpen}
                collapsed={collapsed}
              />

              {/* Agendamentos */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/agendamentos" className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Agendamentos</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Relatórios */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/relatorios" className="hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Relatórios</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Configurações */}
              <CollapsibleMenu
                label="Configurações"
                icon={Settings}
                subItems={configSubItems}
                isActive={isConfigActive}
                open={configOpen}
                onOpenChange={setConfigOpen}
                collapsed={collapsed}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
