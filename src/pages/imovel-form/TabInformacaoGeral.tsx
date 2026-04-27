import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { ImovelCreate } from "@/types/imovel";
import { categoriaLabels } from "@/types/imovel";

interface Props {
  form: ImovelCreate;
  set: <K extends keyof ImovelCreate>(key: K, value: ImovelCreate[K]) => void;
  errors: Record<string, string>;
}

const stages = ["draft", "available", "reserved", "under_proposal", "sold", "rented", "withdrawn", "archived"] as const;
const typologies = ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9+"] as const;
const conditions = ["novo", "usado", "renovado", "para_recuperar", "em_construcao"] as const;
const conditionLabels: Record<string, string> = {
  novo: "Novo",
  usado: "Usado",
  renovado: "Renovado",
  para_recuperar: "Para recuperar",
  em_construcao: "Em construção",
};
const stageLabelsMap: Record<string, string> = {
  draft: "Rascunho",
  available: "Disponível",
  reserved: "Reservado",
  under_proposal: "Em proposta",
  sold: "Vendido",
  rented: "Arrendado",
  withdrawn: "Retirado",
  archived: "Arquivado",
};
const owners = ["Manuel Sousa", "Fernanda Lima", "António Pereira", "Luísa Martins", "José Gomes"];
const agents = ["João Ferreira", "Maria Costa", "Carlos Almeida", "Sofia Rodrigues"];

export default function TabInformacaoGeral({ form, set, errors }: Props) {
  const isTerreno = form.categ_id === "terreno";

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Identificação</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Referência *</Label>
              <Input value={form.ref} onChange={(e) => set("ref", e.target.value)} placeholder="REF-2024-001" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Nome do Imóvel *</Label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex: T3 Cascais Vista Mar" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Estado *</Label>
              <Select value={form.stage_id} onValueChange={(v) => set("stage_id", v as ImovelCreate["stage_id"])}>
                <SelectTrigger className={errors.stage_id ? "border-destructive" : ""}><SelectValue /></SelectTrigger>
                <SelectContent>
                  {stages.map((s) => <SelectItem key={s} value={s}>{stageLabelsMap[s]}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.stage_id && <p className="text-xs text-destructive">{errors.stage_id}</p>}
            </div>
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select value={form.categ_id} onValueChange={(v) => set("categ_id", v as ImovelCreate["categ_id"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(categoriaLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {isTerreno ? (
              <div className="space-y-2">
                <Label>Tipo de Terreno</Label>
                <Select value={form.terrain_type ?? ""} onValueChange={(v) => set("terrain_type", v as ImovelCreate["terrain_type"])}>
                  <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rustic">Rústico</SelectItem>
                    <SelectItem value="urban">Urbano</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Tipologia</Label>
                <Select value={form.typology ?? ""} onValueChange={(v) => set("typology", v as ImovelCreate["typology"])}>
                  <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                  <SelectContent>
                    {typologies.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {!isTerreno && (
            <div className="space-y-2 max-w-xs">
              <Label>Estado de Conservação</Label>
              <Select value={form.condition_id ?? ""} onValueChange={(v) => set("condition_id", v as ImovelCreate["condition_id"])}>
                <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                <SelectContent>
                  {conditions.map((c) => <SelectItem key={c} value={c}>{conditionLabels[c]}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Equipa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Proprietário *</Label>
              <Select value={form.partner_id} onValueChange={(v) => set("partner_id", v)}>
                <SelectTrigger className={errors.partner_id ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecionar proprietário..." />
                </SelectTrigger>
                <SelectContent>
                  {owners.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.partner_id && <p className="text-xs text-destructive">{errors.partner_id}</p>}
            </div>
            <div className="space-y-2">
              <Label>Agente Responsável</Label>
              <Select value={form.employee_id} onValueChange={(v) => set("employee_id", v)}>
                <SelectTrigger><SelectValue placeholder="Selecionar agente..." /></SelectTrigger>
                <SelectContent>
                  {agents.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Assistente</Label>
              <Select value={form.co_scheduled_id ?? ""} onValueChange={(v) => set("co_scheduled_id", v)}>
                <SelectTrigger><SelectValue placeholder="Opcional" /></SelectTrigger>
                <SelectContent>
                  {agents.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Avaliador</Label>
              <Select value={form.evaluator_id ?? ""} onValueChange={(v) => set("evaluator_id", v)}>
                <SelectTrigger><SelectValue placeholder="Opcional" /></SelectTrigger>
                <SelectContent>
                  {agents.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Endereço</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label>Rua</Label>
              <Input value={form.street} onChange={(e) => set("street", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Porta</Label>
              <Input value={form.door ?? ""} onChange={(e) => set("door", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Andar</Label>
              <Input value={form.floor ?? ""} onChange={(e) => set("floor", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Fração</Label>
              <Input value={form.fraction ?? ""} onChange={(e) => set("fraction", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Código Postal</Label>
              <Input value={form.zip ?? ""} onChange={(e) => set("zip", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Zona</Label>
              <Input value={form.zone_id ?? ""} onChange={(e) => set("zone_id", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Freguesia</Label>
              <Input value={form.parish_id ?? ""} onChange={(e) => set("parish_id", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Concelho</Label>
              <Input value={form.county_id ?? ""} onChange={(e) => set("county_id", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Distrito</Label>
              <Input value={form.state_id ?? ""} onChange={(e) => set("state_id", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>País</Label>
              <Input value={form.country_id} onChange={(e) => set("country_id", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Captação</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Captação</Label>
              <Select value={form.gathering_type ?? ""} onValueChange={(v) => set("gathering_type", v as ImovelCreate["gathering_type"])}>
                <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="exclusive">Exclusivo</SelectItem>
                  <SelectItem value="non_exclusive">Não exclusivo</SelectItem>
                  <SelectItem value="shared">Partilhado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Data de Captação</Label>
              <Input type="date" value={form.gathering_date ?? ""} onChange={(e) => set("gathering_date", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Fim de Captação</Label>
              <Input type="date" value={form.gathering_end ?? ""} onChange={(e) => set("gathering_end", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Identificador de Chaves</Label>
              <Input value={form.keys_identifier ?? ""} onChange={(e) => set("keys_identifier", e.target.value)} />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <Label className="text-sm">Placa visível</Label>
              <Switch checked={!!form.display_board} onCheckedChange={(v) => set("display_board", v)} />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <Label className="text-sm">Habitado pelo proprietário</Label>
              <Switch checked={!!form.inhabited_by_owner} onCheckedChange={(v) => set("inhabited_by_owner", v)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
