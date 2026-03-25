import { Navigate } from "react-router-dom";

// Redirect /configuracoes to /configuracoes/perfil
export default function Configuracoes() {
  return <Navigate to="/configuracoes/perfil" replace />;
}
