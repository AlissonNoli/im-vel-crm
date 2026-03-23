import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Phone,
  PhoneOff,
  Mail,
  MessageSquare,
  Globe,
  UserPlus,
  CalendarDays,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { mockLeads, mockImoveis, mockInteracoes, stageLabels, type LeadStage } from "@/data/mockData";

const stages: LeadStage[] = ["novo", "contacto", "visita", "negociacao", "fechado", "perdido"];

export default function ProspectoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lead = mockLeads.find((l) => l.id === id);
  const imovel = mockImoveis.find((i) => lead?.imovel.includes(i.titulo.split(" ")[0]));
  const interacoes = mockInteracoes.filter((i) => i.leadId === id);

  const [form, setForm] = useState({
    nome: lead?.nome ?? "",
    email: lead?.email ?? "",
    email2: "",
    telefone: lead?.telefone ?? "",
    linguagem: "Português",
    origem: lead?.origem ?? "",
    agente: lead?.agente ?? "",
    etapa: lead?.etapa ?? "novo",
    notas: lead?.notas ?? "",
    idAnuncio: "",
    paginaWeb: "",
    entidadeComercial: "",
    equipaVendas: "",
    dataCriacao: lead?.criadoEm ?? "",
    dataTelefonema: "",
    temWhatsApp: false,
    tentouInserir: false,
    observacoes: "",
    descricaoAnuncio: "",
  });

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-muted-foreground">Prospeto não encontrado.</p>
        <Button variant="outline" onClick={() => navigate("/prospectos")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </div>
    );
  }

  const actionButtons = [
    { icon: Phone, label: "Telefonema Atendido", variant: "default" as const },
    { icon: PhoneOff, label: "Telefonema Não Atendido", variant: "outline" as const },
    { icon: AlertTriangle, label: "Descartar Prospeto", variant: "outline" as const },
    { icon: UserPlus, label: "Converter Prospeto", variant: "outline" as const },
    { icon: CalendarDays, label: "Agendar Visita", variant: "outline" as const },
    { icon: Globe, label: "Website", variant: "outline" as const },
    { icon: Mail, label: "Email", variant: "outline" as const },
    { icon: MessageSquare, label: "WhatsApp", variant: "outline" as const },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/prospectos")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Prospectos /</p>
            <h1 className="text-xl font-bold">
              {lead.origem}:{lead.id} - {lead.nome} ({lead.imovel})
            </h1>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Editar</Button>
          <Button>Guardar</Button>
        </div>
      </div>

      {/* Alert for missing email */}
      {!lead.email && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">Prospecto sem e-mail registado. Peça o e-mail do cliente.</span>
        </div>
      )}

      {/* Title card with actions */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                {lead.origem}:{lead.id} - {lead.nome} ({lead.imovel})
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">
                  <Eye className="h-3 w-3 mr-1" />0 Visitas de Angariação
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {actionButtons.map((btn) => (
                <Button key={btn.label} variant={btn.variant} size="sm" className="justify-start text-xs">
                  <btn.icon className="h-3.5 w-3.5 mr-1.5" />
                  {btn.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="geral">
        <TabsList>
          <TabsTrigger value="geral">Informação Geral</TabsTrigger>
          <TabsTrigger value="script">Script de Chamada</TabsTrigger>
          <TabsTrigger value="conversas">Conversações</TabsTrigger>
          <TabsTrigger value="privadas">Mensagens Privadas</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="mt-6 space-y-8">
          {/* Informação do Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Informação do Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome do Contato</Label>
                <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Linguagem</Label>
                <Select value={form.linguagem} onValueChange={(v) => setForm({ ...form, linguagem: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Português">Português</SelectItem>
                    <SelectItem value="Inglês">Inglês</SelectItem>
                    <SelectItem value="Francês">Francês</SelectItem>
                    <SelectItem value="Espanhol">Espanhol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Email 2</Label>
                <Input type="email" value={form.email2} onChange={(e) => setForm({ ...form, email2: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Telemóvel</Label>
                <Input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Informação do Imóvel */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Informação do Imóvel</h3>
            <Tabs defaultValue="imovel-geral">
              <TabsList>
                <TabsTrigger value="imovel-geral">Informação Geral</TabsTrigger>
                <TabsTrigger value="negocios">Negócios Disponíveis</TabsTrigger>
                <TabsTrigger value="estrutural">Informação Estrutural</TabsTrigger>
                <TabsTrigger value="imagens">Imagens</TabsTrigger>
              </TabsList>
              <TabsContent value="imovel-geral" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Imóvel</Label>
                    <Input value={imovel?.titulo ?? lead.imovel} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Endereço</Label>
                    <Input value={imovel?.endereco ?? ""} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Imóvel</Label>
                    <Input value={imovel?.tipo ?? ""} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipologia</Label>
                    <Input value={imovel ? `T${imovel.quartos}` : ""} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Condição</Label>
                    <Input value="Bom estado" readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Certificado Energético</Label>
                    <Input value="Isento" readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Área Bruta</Label>
                    <Input value={imovel ? `${imovel.area} m²` : ""} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Área Útil</Label>
                    <Input value="" readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Área do Terreno</Label>
                    <Input value="" readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Valor Estimado Área</Label>
                    <Input value={imovel ? `€${imovel.valor.toLocaleString("pt-PT")}` : ""} readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ano de Construção</Label>
                    <Input value="" readOnly className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Habitada p/ proprietário</Label>
                    <Input value="" readOnly className="bg-muted" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="negocios" className="mt-4">
                <p className="text-sm text-muted-foreground">Sem negócios disponíveis de momento.</p>
              </TabsContent>
              <TabsContent value="estrutural" className="mt-4">
                <p className="text-sm text-muted-foreground">Informação estrutural não disponível.</p>
              </TabsContent>
              <TabsContent value="imagens" className="mt-4">
                <p className="text-sm text-muted-foreground">Sem imagens associadas.</p>
              </TabsContent>
            </Tabs>
          </div>

          <Separator />

          {/* Informação de Prospeção */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Informação de Prospeção</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Operador a Tratar</Label>
                <Input value={form.agente} onChange={(e) => setForm({ ...form, agente: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Entidade Comercial</Label>
                <Input value={form.entidadeComercial} onChange={(e) => setForm({ ...form, entidadeComercial: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Origem</Label>
                <Input value={form.origem} onChange={(e) => setForm({ ...form, origem: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Agente Responsável</Label>
                <Input value={form.agente} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>ID do Anúncio</Label>
                <Input value={form.idAnuncio} onChange={(e) => setForm({ ...form, idAnuncio: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Equipa de Vendas</Label>
                <Input value={form.equipaVendas} onChange={(e) => setForm({ ...form, equipaVendas: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Página Web</Label>
                <Input value={form.paginaWeb} onChange={(e) => setForm({ ...form, paginaWeb: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Data de Criação</Label>
                <Input value={form.dataCriacao} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Data/Hora do Telefonema Agendado</Label>
                <Input type="datetime-local" value={form.dataTelefonema} onChange={(e) => setForm({ ...form, dataTelefonema: e.target.value })} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Observações */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Observações (privadas)</h3>
            <Textarea
              rows={4}
              value={form.observacoes}
              onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
              placeholder="Observações privadas sobre este prospeto..."
            />
          </div>

          <Separator />

          {/* Descrição do Anúncio */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Descrição do Anúncio</h3>
            <Textarea
              rows={6}
              value={form.descricaoAnuncio}
              onChange={(e) => setForm({ ...form, descricaoAnuncio: e.target.value })}
              placeholder="Descrição completa do anúncio do imóvel..."
            />
          </div>

          {/* Histórico de interações */}
          {interacoes.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Histórico de Interações</h3>
                <div className="space-y-3">
                  {interacoes.map((inter) => (
                    <Card key={inter.id}>
                      <CardContent className="p-3 flex items-start gap-3">
                        <Badge variant="secondary" className="text-xs shrink-0">{inter.tipo}</Badge>
                        <div>
                          <p className="text-sm">{inter.resumo}</p>
                          <p className="text-xs text-muted-foreground mt-1">{inter.data} · {inter.agente}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="script" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Script de chamada não configurado para este prospeto.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversas" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Sem conversações registadas.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privadas" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Sem mensagens privadas.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
