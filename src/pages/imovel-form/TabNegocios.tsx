import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import type { ImovelCreate, ImovelBusiness } from "@/types/imovel";

interface Props {
  form: ImovelCreate;
  set: <K extends keyof ImovelCreate>(key: K, value: ImovelCreate[K]) => void;
}

const businessLabels: Record<ImovelBusiness["business_type_id"], string> = {
  venda: "Venda",
  arrendamento: "Arrendamento",
  trespasse: "Trespasse",
  leasing: "Leasing",
};

export default function TabNegocios({ form, set }: Props) {
  const addBusiness = () => {
    const next: ImovelBusiness = {
      id: crypto.randomUUID(),
      business_type_id: "venda",
      amount: 0,
      negotiable: false,
    };
    set("business_ids", [...form.business_ids, next]);
  };

  const updateBusiness = (id: string, patch: Partial<ImovelBusiness>) => {
    set("business_ids", form.business_ids.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };

  const removeBusiness = (id: string) => {
    set("business_ids", form.business_ids.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Negócios disponíveis</h3>
            <Button size="sm" variant="outline" onClick={addBusiness}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </div>

          {form.business_ids.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">Nenhum negócio definido. Adicione pelo menos um.</p>
          ) : (
            <div className="space-y-3">
              {form.business_ids.map((b) => (
                <div key={b.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border rounded-md items-end">
                  <div className="md:col-span-3 space-y-2">
                    <Label>Tipo</Label>
                    <Select value={b.business_type_id} onValueChange={(v) => updateBusiness(b.id, { business_type_id: v as ImovelBusiness["business_type_id"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(businessLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label>Montante (€)</Label>
                    <Input type="number" value={b.amount} onChange={(e) => updateBusiness(b.id, { amount: Number(e.target.value) })} />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2 h-10">
                    <Switch checked={b.negotiable} onCheckedChange={(v) => updateBusiness(b.id, { negotiable: v })} />
                    <Label className="text-sm">Negociável</Label>
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label>Notas</Label>
                    <Input value={b.notes ?? ""} onChange={(e) => updateBusiness(b.id, { notes: e.target.value })} />
                  </div>
                  <div className="md:col-span-1">
                    <Button variant="ghost" size="icon" onClick={() => removeBusiness(b.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Comissão</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Comissão</Label>
              <Select value={form.commission_type} onValueChange={(v) => set("commission_type", v as ImovelCreate["commission_type"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentagem</SelectItem>
                  <SelectItem value="fixed_value">Valor fixo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.commission_type === "percentage" ? (
              <div className="space-y-2">
                <Label>Percentagem (%)</Label>
                <Input type="number" step="0.1" value={form.commission_percentage ?? 0} onChange={(e) => set("commission_percentage", Number(e.target.value))} />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Valor fixo (€)</Label>
                <Input type="number" value={form.commission_fixed_value ?? 0} onChange={(e) => set("commission_fixed_value", Number(e.target.value))} />
              </div>
            )}
            <div className="flex items-center justify-between rounded-md border p-3">
              <Label className="text-sm">Não partilhar</Label>
              <Switch checked={!!form.no_share} onCheckedChange={(v) => set("no_share", v)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>% Pago no Reforço</Label>
              <Input type="number" value={form.percentage_paid_reinf ?? 0} onChange={(e) => set("percentage_paid_reinf", Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>% Pago no CPCV</Label>
              <Input type="number" value={form.percentage_paid_cpcv ?? 0} onChange={(e) => set("percentage_paid_cpcv", Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>% Pago na Escritura</Label>
              <Input type="number" value={form.percentage_paid_deed ?? 0} onChange={(e) => set("percentage_paid_deed", Number(e.target.value))} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
