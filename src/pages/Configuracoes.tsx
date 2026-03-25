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
import { User, Shield, Users, UserCog } from "lucide-react";
import { useState } from "react";

type Role = "Admin" | "Agent" | "Assistant_Co" | "Coordinator" | "Manager";

interface Utilizador {
  nome: string;
  email: string;
  role: Role;
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
  { nome: "Alisson Noli", email: "despi.661@gmail.com", role: "Admin" },
  { nome: "Administrador", email: "administrador@administrador.com", role: "Admin" },
  { nome: "Agente", email: "agente@agente.com", role: "Agent" },
  { nome: "Assistente Co", email: "assistenteco@assistenteco.com", role: "Assistant_Co" },
  { nome: "Coordenador", email: "coordenador@coordenador.com", role: "Coordinator" },
  { nome: "Gestor", email: "gestor@gestor.com", role: "Manager" },
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

function UtilizadoresTab() {
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" size="sm" className="text-primary">Editar permissões</Button>
                  </DialogTrigger>
                  <EditPermissionsDialog user={u} />
                </Dialog>
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
