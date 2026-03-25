import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { KeyRound } from "lucide-react";
import { useState } from "react";

export default function PerfilPage() {
  const [showResetPassword, setShowResetPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Perfil</h1>
        <p className="text-muted-foreground">Gerir os seus dados pessoais</p>
      </div>

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
            <div><Label>Endereço</Label><Input defaultValue="Rua do Exemplo, 10" /></div>
            <div><Label>Cidade</Label><Input defaultValue="Lisboa" /></div>
            <div><Label>Código Postal</Label><Input defaultValue="1000-001" /></div>
            <div>
              <Label>Perfil / Função</Label>
              <Input defaultValue="Administrador" readOnly className="bg-muted" />
            </div>
          </div>
          <div>
            <Label>Observações</Label>
            <Textarea defaultValue="" placeholder="Notas internas..." />
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
