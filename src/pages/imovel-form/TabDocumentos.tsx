import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileUp, FileText, Trash2, Download } from "lucide-react";
import type { ImovelCreate, ImovelDocument } from "@/types/imovel";

interface Props {
  form: ImovelCreate;
  set: <K extends keyof ImovelCreate>(key: K, value: ImovelCreate[K]) => void;
}

const docTypeLabels: Record<ImovelDocument["type"], string> = {
  ccp: "CCP",
  energy_certificate: "Certificado Energético",
  land_registry: "Caderneta Predial",
  deed: "Escritura",
  plan: "Planta",
  other: "Outro",
};

export default function TabDocumentos({ form, set }: Props) {
  const addDoc = () => {
    const next: ImovelDocument = {
      id: crypto.randomUUID(),
      name: "Novo documento.pdf",
      url: "#",
      type: "other",
      uploaded_at: new Date().toISOString(),
    };
    set("documents", [...form.documents, next]);
  };

  const updateDoc = (id: string, patch: Partial<ImovelDocument>) => {
    set("documents", form.documents.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  };

  const removeDoc = (id: string) => {
    set("documents", form.documents.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Certificado Energético</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Classe Energética</Label>
              <Select value={form.energy_certificate_id ?? ""} onValueChange={(v) => set("energy_certificate_id", v as ImovelCreate["energy_certificate_id"])}>
                <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                <SelectContent>
                  {["A+", "A", "B", "B-", "C", "D", "E", "F", "isento"].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Código do Certificado</Label>
              <Input value={form.energy_certificate_code ?? ""} onChange={(e) => set("energy_certificate_code", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Validade</Label>
              <Input type="date" value={form.energy_certificate_end ?? ""} onChange={(e) => set("energy_certificate_end", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Documentos</h3>
            <Button size="sm" variant="outline" onClick={addDoc}>
              <FileUp className="h-4 w-4 mr-1" /> Adicionar documento
            </Button>
          </div>

          {form.documents.length === 0 ? (
            <div className="border-2 border-dashed rounded-md p-8 text-center text-sm text-muted-foreground">
              Sem documentos anexados.
            </div>
          ) : (
            <div className="space-y-2">
              {form.documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 p-3 border rounded-md">
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input value={doc.name} onChange={(e) => updateDoc(doc.id, { name: e.target.value })} />
                    <Select value={doc.type} onValueChange={(v) => updateDoc(doc.id, { type: v as ImovelDocument["type"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(docTypeLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Badge variant="outline">{new Date(doc.uploaded_at).toLocaleDateString("pt-PT")}</Badge>
                  <Button size="icon" variant="ghost" asChild>
                    <a href={doc.url} download><Download className="h-4 w-4" /></a>
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => removeDoc(doc.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
