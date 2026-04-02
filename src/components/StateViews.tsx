import { Loader2, AlertCircle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoadingState({ message = "A carregar..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function EmptyState({ message = "Sem registos encontrados.", action, actionLabel }: {
  message?: string;
  action?: () => void;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Inbox className="h-12 w-12 text-muted-foreground/50" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {action && actionLabel && (
        <Button variant="outline" size="sm" onClick={action}>{actionLabel}</Button>
      )}
    </div>
  );
}

export function ErrorState({ message = "Ocorreu um erro.", onRetry }: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <AlertCircle className="h-12 w-12 text-destructive/60" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>Tentar novamente</Button>
      )}
    </div>
  );
}
