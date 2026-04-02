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

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Prospectos", url: "/prospectos", icon: Users },
  { title: "Imóveis", url: "/imoveis", icon: Building2 },
  { title: "Clientes", url: "/clientes", icon: UserCheck },
  { title: "Agendamentos", url: "/agendamentos", icon: CalendarDays },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
];

const configSubItems = [
  { title: "Perfil", url: "/configuracoes/perfil", icon: User },
  { title: "Utilizadores", url: "/configuracoes/utilizadores", icon: Users },
  { title: "Permissões por Grupo", url: "/configuracoes/permissoes-grupo", icon: Shield },
  { title: "Permissões por Utilizador", url: "/configuracoes/permissoes-utilizador", icon: UserCog },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isConfigActive = location.pathname.startsWith("/configuracoes");
  const [configOpen, setConfigOpen] = useState(isConfigActive);

  useEffect(() => {
    if (isConfigActive) setConfigOpen(true);
  }, [isConfigActive]);

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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <Collapsible open={configOpen} onOpenChange={setConfigOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={`w-full hover:bg-sidebar-accent cursor-pointer ${isConfigActive ? "text-sidebar-primary font-medium" : ""}`}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">Configurações</span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 transition-transform duration-200 ${configOpen ? "rotate-180" : ""}`}
                          />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenu className="ml-4 mt-1 border-l border-sidebar-border pl-2 space-y-0.5">
                        {configSubItems.map((sub) => (
                          <SidebarMenuItem key={sub.url}>
                            <SidebarMenuButton asChild>
                              <NavLink
                                to={sub.url}
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
