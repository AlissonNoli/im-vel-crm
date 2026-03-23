import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Users } from "lucide-react";

const equipa = [
  { nome: "João Ferreira", email: "joao@crm.pt", role: "admin", status: "ativo" },
  { nome: "Maria Costa", email: "maria@crm.pt", role: "agente", status: "ativo" },
  { nome: "Carlos Dias", email: "carlos@crm.pt", role: "agente", status: "ativo" },
];

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerir perfil, equipa e permissões</p>
      </div>

      <Tabs defaultValue="perfil">
        <TabsList>
          <TabsTrigger value="perfil"><User className="mr-1 h-4 w-4" /> Perfil</TabsTrigger>
          <TabsTrigger value="equipa"><Users className="mr-1 h-4 w-4" /> Equipa</TabsTrigger>
          <TabsTrigger value="permissoes"><Shield className="mr-1 h-4 w-4" /> Permissões</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="mt-4">
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
        </TabsContent>

        <TabsContent value="equipa" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Membros da Equipa</CardTitle>
              <Button size="sm">+ Convidar</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {equipa.map((m) => (
                  <div key={m.email} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="font-medium">{m.nome}</p>
                      <p className="text-sm text-muted-foreground">{m.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={m.role === "admin" ? "default" : "secondary"}>
                        {m.role === "admin" ? "Administrador" : "Agente"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissoes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Permissões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Administrador", "Gestor", "Agente"].map((role) => (
                  <div key={role} className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-medium mb-1">{role}</h4>
                    <p className="text-sm text-muted-foreground">
                      {role === "Administrador" && "Acesso total ao sistema, gestão de utilizadores e configurações"}
                      {role === "Gestor" && "Acesso a relatórios, gestão de equipa e leads"}
                      {role === "Agente" && "Gestão dos próprios leads, imóveis e agendamentos"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
