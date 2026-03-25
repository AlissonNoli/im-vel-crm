import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { utilizadores, roleLabels } from "./ConfigData";
import { EditPermissionsDialog } from "./PermissoesGrupoPage";

export default function PermissoesUtilizadorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Permissões por Utilizador</h1>
        <p className="text-muted-foreground">Gerir permissões individuais de cada utilizador</p>
      </div>

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
    </div>
  );
}
