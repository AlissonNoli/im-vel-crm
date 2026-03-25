import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Role, Utilizador, utilizadores, roleLabels, allPermissions, defaultPermissionsByRole,
} from "./ConfigData";

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
            <SelectTrigger><SelectValue /></SelectTrigger>
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
                <Checkbox checked={perms.includes(p)} onCheckedChange={() => togglePerm(p)} id={`perm-${p}`} />
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

export { EditPermissionsDialog };

export default function PermissoesGrupoPage() {
  const roles = Object.keys(roleLabels) as Role[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Permissões por Grupo</h1>
        <p className="text-muted-foreground">Gerir permissões por perfil de utilizador</p>
      </div>

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
    </div>
  );
}
