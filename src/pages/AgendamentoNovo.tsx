import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ArrowLeft, CalendarDays, Briefcase, Home, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";
import { mockLeads, mockProperties } from "@/data/mocks";

type TipoAgendamento = "comercial" | "angariacao" | "avaliacao";

const tipoConfig: Record<TipoAgendamento, { label: string; icon: React.ReactNode; description: string }> = {
  comercial: {
    label: "Comercial",
    icon: <Briefcase className="h-5 w-5" />,
    description: "Visitas comerciais com clientes interessados em comprar ou arrendar",
  },
  angariacao: {
    label: "Angariação",
    icon: <Home className="h-5 w-5" />,
    description: "Reuniões para angariação de novos imóveis com proprietários",
  },
  avaliacao: {
    label: "Avaliação",
    icon: <ClipboardCheck className="h-5 w-5" />,
    description: "Visitas técnicas para avaliação de imóveis",
  },
};

const agentes = ["João Ferreira", "Maria Costa", "Carlos Almeida", "Sofia Rodrigues"];

export default function AgendamentoNovo() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState<TipoAgendamento>("comercial");
  const [data, setData] = useState<Date>();
  const [hora, setHora] = useState("");
  const [agente, setAgente] = useState("");
  const [lead, setLead] = useState("");
  const [imovel, setImovel] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contactoNome, setContactoNome] = useState("");
  const [contactoTelefone, setContactoTelefone] = useState("");
  const [notas, setNotas] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !hora || !agente) {
      toast.error("Preencha os campos obrigatórios: data, hora e agente.");
      return;
    }
    setSaving(true);
    // TODO: integrate with API
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Agendamento criado com sucesso!");
    setSaving(false);
    navigate("/agendamentos");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/agendamentos")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Novo Agendamento</h1>
          <p className="text-muted-foreground">Crie uma visita, reunião ou avaliação</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Agendamento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tipo de Agendamento</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={tipo}
              onValueChange={(v) => setTipo(v as TipoAgendamento)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {(Object.keys(tipoConfig) as TipoAgendamento[]).map((key) => {
                const cfg = tipoConfig[key];
                const selected = tipo === key;
                return (
                  <label
                    key={key}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-lg border-2 p-4 cursor-pointer transition-colors text-center",
                      selected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/40"
                    )}
                  >
                    <RadioGroupItem value={key} className="sr-only" />
                    <div className={cn("p-2 rounded-full", selected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
                      {cfg.icon}
                    </div>
                    <span className="font-semibold text-sm">{cfg.label}</span>
                    <span className="text-xs text-muted-foreground leading-tight">{cfg.description}</span>
                  </label>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Data, Hora e Agente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Data e Responsável</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !data && "text-muted-foreground")}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {data ? format(data, "dd/MM/yyyy", { locale: pt }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data}
                    onSelect={setData}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Hora *</Label>
              <Input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label>Agente Responsável *</Label>
              <Select value={agente} onValueChange={setAgente}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar agente" />
                </SelectTrigger>
                <SelectContent>
                  {agentes.map((a) => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Campos específicos por tipo */}
        {tipo === "comercial" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalhes Comerciais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prospeto / Lead</Label>
                <Select value={lead} onValueChange={setLead}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar prospeto" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLeads.map((l) => (
                      <SelectItem key={l.id} value={String(l.id)}>{l.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Imóvel</Label>
                <Select value={imovel} onValueChange={setImovel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar imóvel" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProperties.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>{p.titulo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {tipo === "angariacao" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalhes de Angariação</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome do Proprietário</Label>
                <Input value={contactoNome} onChange={(e) => setContactoNome(e.target.value)} placeholder="Nome do proprietário" />
              </div>
              <div className="space-y-2">
                <Label>Telefone do Proprietário</Label>
                <Input value={contactoTelefone} onChange={(e) => setContactoTelefone(e.target.value)} placeholder="+351 9XX XXX XXX" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Endereço do Imóvel</Label>
                <Input value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Morada completa do imóvel a angariar" />
              </div>
            </CardContent>
          </Card>
        )}

        {tipo === "avaliacao" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalhes da Avaliação</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Imóvel a Avaliar</Label>
                <Select value={imovel} onValueChange={setImovel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar imóvel" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProperties.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>{p.titulo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Contacto no Local</Label>
                <Input value={contactoNome} onChange={(e) => setContactoNome(e.target.value)} placeholder="Nome de quem estará presente" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Endereço (se diferente)</Label>
                <Input value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço alternativo" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Notas adicionais sobre este agendamento..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/agendamentos")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "A guardar..." : "Criar Agendamento"}
          </Button>
        </div>
      </form>
    </div>
  );
}
