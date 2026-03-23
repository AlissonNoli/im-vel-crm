import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { QuickAddButton } from "@/components/QuickAddButton";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function CRMLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
        <QuickAddButton />
      </div>
    </SidebarProvider>
  );
}
