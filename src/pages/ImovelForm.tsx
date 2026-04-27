import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, X, Building2, Briefcase, Ruler, Languages, Image as ImageIcon, FileText, History } from "lucide-react";
import { toast } from "sonner";
import type { ImovelCreate, ImovelStageHistoryEntry } from "@/types/imovel";
import { defaultAmenities, stageLabels, stageVariants } from "@/types/imovel";
import { mockImoveis } from "@/data/mockImoveis";

import TabInformacaoGeral from "./imovel-form/TabInformacaoGeral";
import TabNegocios from "./imovel-form/TabNegocios";
import TabEstrutural from "./imovel-form/TabEstrutural";
import TabDescricoes from "./imovel-form/TabDescricoes";
import TabMedia from "./imovel-form/TabMedia";
import TabDocumentos from "./imovel-form/TabDocumentos";
import TabHistorico from "./imovel-form/TabHistorico";

const emptyForm: ImovelCreate = {
  ref: "",
  name: "",
  stage_id: "draft",
  categ_id: "apartamento",
  typology: "T2",
  partner_id: "",
  employee_id: "",
  street: "",
  country_id: "Portugal",
  area: 0,
  number_of_rooms: 0,
  number_of_bathrooms: 0,
  amenities: { ...defaultAmenities },
  business_ids: [],
  commission_type: "percentage",
  commission_percentage: 5,
  images: [],
  documents: [],
};

export default function ImovelForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const editing = Boolean(id);

  const initialHistory = useMemo<ImovelStageHistoryEntry[]>(() => {
    if (!editing) return [];
    const found = mockImoveis.find((i) => i.id === Number(id));
    return found?.stage_history ?? [];
  }, [id, editing]);

  const [form, setForm] = useState<ImovelCreate>(() => {
    if (editing) {
      const found = mockImoveis.find((i) => i.id === Number(id));
      if (found) {
        const { id: _id, created_at, updated_at, stage_history, ...rest } = found;
        return rest as ImovelCreate;
      }
    }
    return emptyForm;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof ImovelCreate>(key: K, value: ImovelCreate[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.ref.trim()) e.ref = "Referência obrigatória";
    if (!form.name.trim()) e.name = "Nome obrigatório";
    if (!form.partner_id) e.partner_id = "Proprietário obrigatório";
    if (!form.stage_id) e.stage_id = "Estado obrigatório";
    if (form.business_ids.length === 0) e.business_ids = "Pelo menos um negócio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      toast.error("Por favor corrija os erros antes de guardar.");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    toast.success(editing ? "Imóvel atualizado." : "Imóvel criado com sucesso.");
    setSaving(false);
    navigate("/imoveis");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/imoveis")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {editing ? form.name || "Editar Imóvel" : "Novo Imóvel"}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={stageVariants[form.stage_id]}>{stageLabels[form.stage_id]}</Badge>
              {form.ref && <span className="text-sm text-muted-foreground">{form.ref}</span>}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/imoveis")}>
            <X className="h-4 w-4 mr-2" /> Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" /> {saving ? "A guardar..." : "Guardar"}
          </Button>
        </div>
      </div>

      {/* Validation summary */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <p className="font-medium mb-1">Existem campos por preencher:</p>
          <ul className="list-disc list-inside text-xs">
            {Object.values(errors).map((msg) => <li key={msg}>{msg}</li>)}
          </ul>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto">
          <TabsTrigger value="geral" className="gap-2"><Building2 className="h-4 w-4" /> Geral</TabsTrigger>
          <TabsTrigger value="negocios" className="gap-2"><Briefcase className="h-4 w-4" /> Negócios</TabsTrigger>
          <TabsTrigger value="estrutural" className="gap-2"><Ruler className="h-4 w-4" /> Estrutural</TabsTrigger>
          <TabsTrigger value="descricoes" className="gap-2"><Languages className="h-4 w-4" /> Descrições</TabsTrigger>
          <TabsTrigger value="media" className="gap-2"><ImageIcon className="h-4 w-4" /> Media</TabsTrigger>
          <TabsTrigger value="docs" className="gap-2"><FileText className="h-4 w-4" /> Documentos</TabsTrigger>
          <TabsTrigger value="historico" className="gap-2"><History className="h-4 w-4" /> Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="mt-6">
          <TabInformacaoGeral form={form} set={set} errors={errors} />
        </TabsContent>
        <TabsContent value="negocios" className="mt-6">
          <TabNegocios form={form} set={set} />
        </TabsContent>
        <TabsContent value="estrutural" className="mt-6">
          <TabEstrutural form={form} set={set} />
        </TabsContent>
        <TabsContent value="descricoes" className="mt-6">
          <TabDescricoes form={form} set={set} />
        </TabsContent>
        <TabsContent value="media" className="mt-6">
          <TabMedia form={form} set={set} />
        </TabsContent>
        <TabsContent value="docs" className="mt-6">
          <TabDocumentos form={form} set={set} />
        </TabsContent>
        <TabsContent value="historico" className="mt-6">
          <TabHistorico history={initialHistory} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
