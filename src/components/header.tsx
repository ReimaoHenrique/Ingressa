"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Ticket, Home, Search, Settings } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <header className="border-b bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Ticket className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-foreground">
              TicketPlatform
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-1 text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Início</span>
            </Link>
            <Link
              href="/verificar"
              className="flex items-center space-x-1 text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Verificar Ingresso</span>
            </Link>
            <Link
              href="/admin"
              className="flex items-center space-x-1 text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDrawerOpen(true)}
              >
                Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
          <div className="bg-background w-64 h-full shadow-lg p-6 flex flex-col gap-6 animate-slide-in-left">
            <button
              className="self-end mb-4 text-2xl"
              onClick={() => setDrawerOpen(false)}
            >
              &times;
            </button>
            <Link
              href="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-blue-600 transition-colors"
              onClick={() => setDrawerOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Início</span>
            </Link>
            <Link
              href="/verificar"
              className="flex items-center space-x-2 text-muted-foreground hover:text-blue-600 transition-colors"
              onClick={() => setDrawerOpen(false)}
            >
              <Search className="h-4 w-4" />
              <span>Verificar Ingresso</span>
            </Link>
            <Link
              href="/admin"
              className="flex items-center space-x-2 text-muted-foreground hover:text-blue-600 transition-colors"
              onClick={() => setDrawerOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>
          <div className="flex-1" onClick={() => setDrawerOpen(false)} />
        </div>
      )}
    </header>
  );
}
