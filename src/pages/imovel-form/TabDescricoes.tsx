import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ImovelCreate, ImovelDescriptions } from "@/types/imovel";

interface Props {
  form: ImovelCreate;
  set: <K extends keyof ImovelCreate>(key: K, value: ImovelCreate[K]) => void;
}

export default function TabDescricoes({ form, set }: Props) {
  const desc: ImovelDescriptions = form.descriptions ?? { pt: "", en: "", fr: "" };

  const updateDesc = (patch: Partial<ImovelDescriptions>) => {
    set("descriptions", { ...desc, ...patch });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Observações Internas</h3>
          <Textarea rows={4} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} placeholder="Notas privadas (não publicadas)" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Descrição Pública (Multilíngue)</h3>
          <Tabs defaultValue="pt">
            <TabsList>
              <TabsTrigger value="pt">🇵🇹 Português</TabsTrigger>
              <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
              <TabsTrigger value="fr">🇫🇷 Français</TabsTrigger>
            </TabsList>
            <TabsContent value="pt" className="pt-4">
              <Textarea rows={6} value={desc.pt} onChange={(e) => updateDesc({ pt: e.target.value })} placeholder="Descrição em português..." />
            </TabsContent>
            <TabsContent value="en" className="pt-4">
              <Textarea rows={6} value={desc.en} onChange={(e) => updateDesc({ en: e.target.value })} placeholder="Description in English..." />
            </TabsContent>
            <TabsContent value="fr" className="pt-4">
              <Textarea rows={6} value={desc.fr} onChange={(e) => updateDesc({ fr: e.target.value })} placeholder="Description en français..." />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">SEO / Metadados</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Meta Título</Label>
              <Input value={desc.meta_title ?? ""} onChange={(e) => updateDesc({ meta_title: e.target.value })} maxLength={60} />
              <p className="text-xs text-muted-foreground">{(desc.meta_title ?? "").length}/60 caracteres</p>
            </div>
            <div className="space-y-2">
              <Label>Meta Descrição</Label>
              <Textarea rows={2} value={desc.meta_description ?? ""} onChange={(e) => updateDesc({ meta_description: e.target.value })} maxLength={160} />
              <p className="text-xs text-muted-foreground">{(desc.meta_description ?? "").length}/160 caracteres</p>
            </div>
            <div className="space-y-2">
              <Label>Palavras-chave</Label>
              <Input value={desc.keywords ?? ""} onChange={(e) => updateDesc({ keywords: e.target.value })} placeholder="separadas por vírgulas" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
