import { Plus, Users, Building2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function QuickAddButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="mb-2">
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            Novo Lead
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Building2 className="mr-2 h-4 w-4" />
            Adicionar Imóvel
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CalendarDays className="mr-2 h-4 w-4" />
            Agendar Visita
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
