import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, KeyRound } from "lucide-react";
import { useState } from "react";
import { Utilizador, utilizadores, roleLabels } from "./ConfigData";

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

export default function UtilizadoresPage() {
  const [selectedUser, setSelectedUser] = useState<Utilizador | null>(null);

  if (selectedUser) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Utilizadores</h1>
          <p className="text-muted-foreground">Editar perfil do utilizador</p>
        </div>
        <PerfilUtilizadorView user={selectedUser} onBack={() => setSelectedUser(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Utilizadores</h1>
        <p className="text-muted-foreground">Gerir equipa e contas de utilizadores</p>
      </div>

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
    </div>
  );
}
