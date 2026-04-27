import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";
import type { ImovelStageHistoryEntry } from "@/types/imovel";
import { stageLabels, stageVariants } from "@/types/imovel";

interface Props {
  history: ImovelStageHistoryEntry[];
}

export default function TabHistorico({ history }: Props) {
  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center text-muted-foreground text-sm">
          <History className="h-10 w-10 mx-auto mb-3 opacity-40" />
          Sem histórico de estado registado.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">Histórico de Mudança de Estado</h3>
        <div className="relative pl-6 border-l-2 border-border space-y-6">
          {history.slice().reverse().map((entry) => (
            <div key={entry.id} className="relative">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-background" />
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {entry.from_stage && (
                  <>
                    <Badge variant={stageVariants[entry.from_stage]}>{stageLabels[entry.from_stage]}</Badge>
                    <span className="text-muted-foreground text-sm">→</span>
                  </>
                )}
                <Badge variant={stageVariants[entry.to_stage]}>{stageLabels[entry.to_stage]}</Badge>
              </div>
              <div className="text-sm">
                <span className="font-medium">{entry.user}</span>
                <span className="text-muted-foreground"> · {new Date(entry.changed_at).toLocaleString("pt-PT")}</span>
              </div>
              {entry.notes && <p className="text-sm text-muted-foreground mt-1">{entry.notes}</p>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
