import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ImagePlus, Star, Trash2, Youtube } from "lucide-react";
import type { ImovelCreate, ImovelImage } from "@/types/imovel";

interface Props {
  form: ImovelCreate;
  set: <K extends keyof ImovelCreate>(key: K, value: ImovelCreate[K]) => void;
}

export default function TabMedia({ form, set }: Props) {
  const addImage = () => {
    const next: ImovelImage = {
      id: crypto.randomUUID(),
      url: "/placeholder.svg",
      caption: "",
      is_cover: form.images.length === 0,
      order: form.images.length + 1,
    };
    set("images", [...form.images, next]);
  };

  const removeImage = (id: string) => {
    set("images", form.images.filter((i) => i.id !== id));
  };

  const setCover = (id: string) => {
    set("images", form.images.map((i) => ({ ...i, is_cover: i.id === id })));
  };

  const updateCaption = (id: string, caption: string) => {
    set("images", form.images.map((i) => (i.id === id ? { ...i, caption } : i)));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Galeria de Imagens</h3>
            <Button size="sm" variant="outline" onClick={addImage}>
              <ImagePlus className="h-4 w-4 mr-1" /> Adicionar imagem
            </Button>
          </div>

          {form.images.length === 0 ? (
            <div className="border-2 border-dashed rounded-md p-8 text-center text-sm text-muted-foreground">
              Sem imagens. Clique em "Adicionar imagem" para começar.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {form.images.map((img) => (
                <div key={img.id} className="border rounded-md overflow-hidden group relative">
                  <div className="aspect-video bg-secondary flex items-center justify-center">
                    <img src={img.url} alt={img.caption ?? ""} className="object-cover w-full h-full" />
                  </div>
                  {img.is_cover && (
                    <Badge className="absolute top-2 left-2">Capa</Badge>
                  )}
                  <div className="p-2 space-y-2">
                    <Input
                      placeholder="Legenda"
                      value={img.caption ?? ""}
                      onChange={(e) => updateCaption(img.id, e.target.value)}
                      className="text-xs"
                    />
                    <div className="flex justify-between gap-1">
                      <Button size="sm" variant="ghost" onClick={() => setCover(img.id)} disabled={img.is_cover}>
                        <Star className="h-3 w-3 mr-1" /> Capa
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeImage(img.id)}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Vídeo</h3>
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Youtube className="h-4 w-4" /> Link do YouTube</Label>
            <Input value={form.youtube_link ?? ""} onChange={(e) => set("youtube_link", e.target.value)} placeholder="https://youtube.com/watch?v=..." />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
