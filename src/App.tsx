import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CRMLayout from "@/components/CRMLayout";
import Dashboard from "@/pages/Dashboard";
import Prospectos from "@/pages/Prospectos";
import ProspectoDetalhe from "@/pages/ProspectoDetalhe";
import Imoveis from "@/pages/Imoveis";
import Proprietarios from "@/pages/Proprietarios";
import Compradores from "@/pages/Compradores";
import Agendamentos from "@/pages/Agendamentos";
import Relatorios from "@/pages/Relatorios";
import Configuracoes from "@/pages/Configuracoes";
import PerfilPage from "@/pages/configuracoes/PerfilPage";
import UtilizadoresPage from "@/pages/configuracoes/UtilizadoresPage";
import PermissoesGrupoPage from "@/pages/configuracoes/PermissoesGrupoPage";
import PermissoesUtilizadorPage from "@/pages/configuracoes/PermissoesUtilizadorPage";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<CRMLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/prospectos" element={<Prospectos />} />
            <Route path="/prospectos/:id" element={<ProspectoDetalhe />} />
            <Route path="/imoveis" element={<Imoveis />} />
            <Route path="/proprietarios" element={<Proprietarios />} />
            <Route path="/compradores" element={<Compradores />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/configuracoes/perfil" element={<PerfilPage />} />
            <Route path="/configuracoes/utilizadores" element={<UtilizadoresPage />} />
            <Route path="/configuracoes/permissoes-grupo" element={<PermissoesGrupoPage />} />
            <Route path="/configuracoes/permissoes-utilizador" element={<PermissoesUtilizadorPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
