"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Ticket, Home, Search, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Ticket className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-foreground">TicketPlatform</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-muted-foreground hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4" />
              <span>Início</span>
            </Link>
            <Link href="/verificar" className="flex items-center space-x-1 text-muted-foreground hover:text-blue-600 transition-colors">
              <Search className="h-4 w-4" />
              <span>Verificar Ingresso</span>
            </Link>
            <Link href="/admin" className="flex items-center space-x-1 text-muted-foreground hover:text-blue-600 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="md:hidden">
              <Button variant="outline" size="sm">
                Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

