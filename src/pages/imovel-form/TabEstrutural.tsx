import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import type { ImovelCreate, ImovelDivision, ImovelAmenities } from "@/types/imovel";
import { amenityLabels } from "@/types/imovel";

interface Props {
  form: ImovelCreate;
  set: <K extends keyof ImovelCreate>(key: K, value: ImovelCreate[K]) => void;
}

export default function TabEstrutural({ form, set }: Props) {
  const isTerreno = form.categ_id === "terreno";
  const showCondo = form.amenities.have_gated_community;

  const addDivision = () => {
    const next: ImovelDivision = { id: crypto.randomUUID(), name: "", area: 0 };
    set("divisions", [...(form.divisions ?? []), next]);
  };
  const updateDivision = (id: string, patch: Partial<ImovelDivision>) => {
    set("divisions", (form.divisions ?? []).map((d) => (d.id === id ? { ...d, ...patch } : d)));
  };
  const removeDivision = (id: string) => {
    set("divisions", (form.divisions ?? []).filter((d) => d.id !== id));
  };

  const toggleAmenity = (key: keyof ImovelAmenities, value: boolean) => {
    set("amenities", { ...form.amenities, [key]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Áreas e Métricas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {!isTerreno && (
              <div className="space-y-2">
                <Label>Área Útil (m²)</Label>
                <Input type="number" value={form.area} onChange={(e) => set("area", Number(e.target.value))} />
              </div>
            )}
            {!isTerreno && (
              <div className="space-y-2">
                <Label>Área Bruta (m²)</Label>
                <Input type="number" value={form.gross_area ?? 0} onChange={(e) => set("gross_area", Number(e.target.value))} />
              </div>
            )}
            <div className="space-y-2">
              <Label>Área Terreno (m²)</Label>
              <Input type="number" value={form.land_area ?? 0} onChange={(e) => set("land_area", Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Área Implantação (m²)</Label>
              <Input type="number" value={form.implementationArea ?? 0} onChange={(e) => set("implementationArea", Number(e.target.value))} />
            </div>
            {!isTerreno && (
              <div className="space-y-2">
                <Label>Ano de Construção</Label>
                <Input type="number" value={form.construction_year ?? ""} onChange={(e) => set("construction_year", Number(e.target.value))} />
              </div>
            )}
            {showCondo && (
              <div className="space-y-2">
                <Label>Despesas Condomínio (€/mês)</Label>
                <Input type="number" value={form.condo_expense ?? 0} onChange={(e) => set("condo_expense", Number(e.target.value))} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {!isTerreno && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Características</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Quartos</Label>
                <Input type="number" value={form.number_of_rooms} onChange={(e) => set("number_of_rooms", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Casas de banho</Label>
                <Input type="number" value={form.number_of_bathrooms} onChange={(e) => set("number_of_bathrooms", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Pisos</Label>
                <Input type="number" value={form.number_of_floors ?? 0} onChange={(e) => set("number_of_floors", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Roupeiros</Label>
                <Input type="number" value={form.number_of_cabinets ?? 0} onChange={(e) => set("number_of_cabinets", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Garagem (lugares)</Label>
                <Input type="number" value={form.box_car_capacity ?? 0} onChange={(e) => set("box_car_capacity", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Estacionamento</Label>
                <Input type="number" value={form.parking_capacity ?? 0} onChange={(e) => set("parking_capacity", Number(e.target.value))} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Divisões</h3>
            <Button size="sm" variant="outline" onClick={addDivision}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </div>
          {(form.divisions ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Sem divisões definidas.</p>
          ) : (
            <div className="space-y-2">
              {(form.divisions ?? []).map((d) => (
                <div key={d.id} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5 space-y-1">
                    <Label className="text-xs">Nome</Label>
                    <Input value={d.name} onChange={(e) => updateDivision(d.id, { name: e.target.value })} />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <Label className="text-xs">Área (m²)</Label>
                    <Input type="number" value={d.area} onChange={(e) => updateDivision(d.id, { area: Number(e.target.value) })} />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <Label className="text-xs">Piso</Label>
                    <Input value={d.floor ?? ""} onChange={(e) => updateDivision(d.id, { floor: e.target.value })} />
                  </div>
                  <div className="col-span-1">
                    <Button variant="ghost" size="icon" onClick={() => removeDivision(d.id)}>
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
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Comodidades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(Object.keys(amenityLabels) as Array<keyof ImovelAmenities>).map((key) => (
              <div key={key} className="flex items-center justify-between rounded-md border p-3">
                <Label className="text-sm font-normal">{amenityLabels[key]}</Label>
                <Switch checked={form.amenities[key]} onCheckedChange={(v) => toggleAmenity(key, v)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
