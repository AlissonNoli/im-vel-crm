import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Shield, Users, UserCog, ArrowLeft, KeyRound } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type Role = "Admin" | "Agent" | "Assistant_Co" | "Coordinator" | "Manager";

interface Utilizador {
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

const allPermissions = [
  "Pode ver todos os prospetos",
  "Pode editar imóveis",
  "Pode gerir permissões",
  "Pode ver relatórios",
  "Pode ver prospetos próprios",
  "Pode criar agendamentos",
  "Pode editar proprietários",
  "Pode editar compradores",
];

const defaultPermissionsByRole: Record<Role, string[]> = {
  Admin: allPermissions,
  Agent: ["Pode ver prospetos próprios", "Pode criar agendamentos"],
  Assistant_Co: ["Pode ver prospetos próprios", "Pode criar agendamentos", "Pode editar imóveis"],
  Coordinator: ["Pode ver todos os prospetos", "Pode ver relatórios", "Pode criar agendamentos", "Pode editar imóveis"],
  Manager: ["Pode ver todos os prospetos", "Pode ver relatórios", "Pode gerir permissões", "Pode editar imóveis"],
};

const utilizadores: Utilizador[] = [
  { nome: "Alisson Noli", email: "despi.661@gmail.com", role: "Admin", telefone: "+351 912 345 678", endereco: "Rua das Flores, 123", cidade: "Lisboa", codigoPostal: "1000-001", cargo: "Diretor" },
  { nome: "Administrador", email: "administrador@administrador.com", role: "Admin", telefone: "+351 913 000 000", endereco: "Av. da Liberdade, 50", cidade: "Lisboa", codigoPostal: "1250-001", cargo: "Administrador" },
  { nome: "Agente", email: "agente@agente.com", role: "Agent", telefone: "+351 914 000 000", endereco: "Rua Augusta, 10", cidade: "Porto", codigoPostal: "4000-001", cargo: "Consultor Imobiliário" },
  { nome: "Assistente Co", email: "assistenteco@assistenteco.com", role: "Assistant_Co", telefone: "+351 915 000 000", endereco: "Rua do Carmo, 5", cidade: "Coimbra", codigoPostal: "3000-001", cargo: "Assistente Comercial" },
  { nome: "Coordenador", email: "coordenador@coordenador.com", role: "Coordinator", telefone: "+351 916 000 000", endereco: "Praça da República, 8", cidade: "Braga", codigoPostal: "4700-001", cargo: "Coordenador de Equipa" },
  { nome: "Gestor", email: "gestor@gestor.com", role: "Manager", telefone: "+351 917 000 000", endereco: "Rua do Comércio, 22", cidade: "Faro", codigoPostal: "8000-001", cargo: "Gestor Comercial" },
];

const roleLabels: Record<Role, string> = {
  Admin: "Administrador",
  Agent: "Agente",
  Assistant_Co: "Assistente Co",
  Coordinator: "Coordenador",
  Manager: "Gestor",
};

function EditPermissionsDialog({ user }: { user: Utilizador }) {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [perms, setPerms] = useState<string[]>(defaultPermissionsByRole[user.role]);

  const togglePerm = (p: string) => {
    setPerms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Editar permissões</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label>Perfil</Label>
          <Select
            value={selectedRole}
            onValueChange={(v) => {
              const role = v as Role;
              setSelectedRole(role);
              setPerms(defaultPermissionsByRole[role]);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(roleLabels) as Role[]).map((r) => (
                <SelectItem key={r} value={r}>{roleLabels[r]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div>
          <h4 className="font-medium mb-3">Permissões customizadas</h4>
          <div className="space-y-3">
            {allPermissions.map((p) => (
              <div key={p} className="flex items-center gap-2">
                <Checkbox
                  checked={perms.includes(p)}
                  onCheckedChange={() => togglePerm(p)}
                  id={`perm-${p}`}
                />
                <Label htmlFor={`perm-${p}`} className="font-normal cursor-pointer">{p}</Label>
              </div>
            ))}
          </div>
        </div>
        <Button className="w-full">Gravar permissões</Button>
      </div>
    </DialogContent>
  );
}

function PerfilUtilizadorView({ user, onBack }: { user: Utilizador; onBack: () => void }) {
  const [showResetPassword, setShowResetPassword] = useState(false);

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-2">
        <ArrowLeft className="mr-1 h-4 w-4" /> Voltar à lista
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Perfil de {user.nome}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Nome</Label><Input defaultValue={user.nome} /></div>
            <div><Label>E-mail</Label><Input defaultValue={user.email} /></div>
            <div><Label>Telefone</Label><Input defaultValue={user.telefone || ""} /></div>
            <div><Label>Cargo</Label><Input defaultValue={user.cargo || ""} /></div>
            <div><Label>Endereço</Label><Input defaultValue={user.endereco || ""} /></div>
            <div><Label>Cidade</Label><Input defaultValue={user.cidade || ""} /></div>
            <div><Label>Código Postal</Label><Input defaultValue={user.codigoPostal || ""} /></div>
            <div>
              <Label>Perfil / Função</Label>
              <Input defaultValue={roleLabels[user.role]} readOnly className="bg-muted" />
            </div>
          </div>
          <div>
            <Label>Observações</Label>
            <Textarea defaultValue={user.observacoes || ""} placeholder="Notas internas sobre este utilizador..." />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setShowResetPassword(!showResetPassword)}>
              <KeyRound className="mr-1 h-4 w-4" /> Redefinir Senha
            </Button>
            <Button>Guardar Alterações</Button>
          </div>

          {showResetPassword && (
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="pt-4 space-y-3">
                <h4 className="font-medium">Redefinir Senha</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Nova Senha</Label><Input type="password" placeholder="••••••••" /></div>
                  <div><Label>Confirmar Senha</Label><Input type="password" placeholder="••••••••" /></div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowResetPassword(false)}>Cancelar</Button>
                  <Button variant="destructive" size="sm">Confirmar Redefinição</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function UtilizadoresTab() {
  const [selectedUser, setSelectedUser] = useState<Utilizador | null>(null);

  if (selectedUser) {
    return <PerfilUtilizadorView user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Utilizadores</CardTitle>
        <Button size="sm">+ Convidar</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {utilizadores.map((u) => (
            <div key={u.email} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="font-medium">{u.nome}</p>
                <p className="text-sm text-muted-foreground">{u.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={u.role === "Admin" ? "default" : "secondary"}>
                  {roleLabels[u.role]}
                </Badge>
                <Button variant="link" size="sm" className="text-primary" onClick={() => setSelectedUser(u)}>
                  Editar perfil
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PermissoesGrupoTab() {
  const roles = Object.keys(roleLabels) as Role[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestão de Permissões por Grupo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {roles.map((role) => {
          const members = utilizadores.filter((u) => u.role === role);
          return (
            <div key={role} className="space-y-2">
              <h3 className="text-lg font-semibold">{roleLabels[role]}</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {members.map((m) => (
                  <li key={m.email}>
                    {m.nome} ({m.email}){" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" size="sm" className="text-primary p-0 h-auto">Editar permissões</Button>
                      </DialogTrigger>
                      <EditPermissionsDialog user={m} />
                    </Dialog>
                  </li>
                ))}
              </ul>
              <div className="mt-2 p-3 rounded-md bg-muted/50">
                <p className="text-xs font-medium text-muted-foreground mb-1">Permissões do grupo:</p>
                <div className="flex flex-wrap gap-1">
                  {defaultPermissionsByRole[role].map((p) => (
                    <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function PerfilTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil do Utilizador</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Nome</Label><Input defaultValue="João Ferreira" /></div>
          <div><Label>E-mail</Label><Input defaultValue="joao@crm.pt" /></div>
          <div><Label>Telefone</Label><Input defaultValue="+351 911 000 000" /></div>
          <div><Label>Cargo</Label><Input defaultValue="Consultor Imobiliário" /></div>
        </div>
        <Separator />
        <div className="flex justify-end">
          <Button>Guardar Alterações</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerir perfil, utilizadores e permissões</p>
      </div>

      <Tabs defaultValue="perfil">
        <TabsList>
          <TabsTrigger value="perfil"><User className="mr-1 h-4 w-4" /> Perfil</TabsTrigger>
          <TabsTrigger value="utilizadores"><Users className="mr-1 h-4 w-4" /> Utilizadores</TabsTrigger>
          <TabsTrigger value="permissoes-grupo"><Shield className="mr-1 h-4 w-4" /> Permissões por Grupo</TabsTrigger>
          <TabsTrigger value="permissoes-utilizador"><UserCog className="mr-1 h-4 w-4" /> Permissões por Utilizador</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="mt-4">
          <PerfilTab />
        </TabsContent>

        <TabsContent value="utilizadores" className="mt-4">
          <UtilizadoresTab />
        </TabsContent>

        <TabsContent value="permissoes-grupo" className="mt-4">
          <PermissoesGrupoTab />
        </TabsContent>

        <TabsContent value="permissoes-utilizador" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Permissões por Utilizador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {utilizadores.map((u) => (
                <div key={u.email} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium">{u.nome}</p>
                    <p className="text-sm text-muted-foreground">{u.email} — {roleLabels[u.role]}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Editar permissões</Button>
                    </DialogTrigger>
                    <EditPermissionsDialog user={u} />
                  </Dialog>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
