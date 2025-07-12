"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, MapPin, Users, ExternalLink, Info } from "lucide-react";
import { eventoMock } from "@/lib/mock-data";
import { Evento } from "@/types";

export default function Home() {
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento da API
    const fetchEvento = async () => {
      try {
        // Simula delay da API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEvento(eventoMock);
      } catch (error) {
        console.error("Erro ao carregar evento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-muted h-64 rounded-lg mb-6"></div>
            <div className="bg-muted h-8 rounded mb-4"></div>
            <div className="bg-muted h-4 rounded mb-2"></div>
            <div className="bg-muted h-4 rounded mb-2"></div>
            <div className="bg-muted h-4 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Nenhum evento encontrado no momento.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const ingressosVendidos = evento.ingressosTotal - evento.ingressosDisponiveis;
  const percentualVendido = (ingressosVendidos / evento.ingressosTotal) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <EventoImagemHeader evento={evento} formatDate={formatDate} />
          <EventoInfo evento={evento} />
          <CardContent className="space-y-6">
            <EventoEstatisticas
              evento={evento}
              formatPrice={formatPrice}
              percentualVendido={percentualVendido}
            />
            <EventoProgresso
              ingressosVendidos={ingressosVendidos}
              ingressosTotal={evento.ingressosTotal}
              percentualVendido={percentualVendido}
            />
            <EventoTermos termos={evento.termosUso} />
          </CardContent>
          <EventoFooter evento={evento} />
        </Card>
      </div>
    </div>
  );
}

// Componentes internos para modularização do Card
function EventoImagemHeader({
  evento,
  formatDate,
}: {
  evento: Evento;
  formatDate: (date: string) => string;
}) {
  const [imageError, setImageError] = useState(false);

  const fallbackSvg =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIjk0YTNhYiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV2ZW50byBkZSBNw7pzaWNhPC90ZXh0Pjwvc3ZnPg==";

  return (
    <div className="relative h-64 md:h-80">
      {!imageError ? (
        <Image
          src={evento.imagem}
          alt={evento.nome}
          fill
          className="object-cover"
          priority
          onError={() => setImageError(true)}
          unoptimized={false}
        />
      ) : (
        <div
          className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          style={{
            backgroundImage: `url("${fallbackSvg}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
        <div className="p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{evento.nome}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(evento.data)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{evento.local}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventoInfo({ evento }: { evento: Evento }) {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>Informações do Evento</span>
        <Badge
          variant={evento.ingressosDisponiveis > 0 ? "default" : "destructive"}
        >
          {evento.ingressosDisponiveis > 0 ? "Disponível" : "Esgotado"}
        </Badge>
      </CardTitle>
      <CardDescription className="text-base leading-relaxed">
        {evento.descricao}
      </CardDescription>
    </CardHeader>
  );
}

function EventoEstatisticas({
  evento,
  formatPrice,
  percentualVendido,
}: {
  evento: Evento;
  formatPrice: (price: number) => string;
  percentualVendido: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
        <div className="text-2xl font-bold text-blue-600">
          {evento.ingressosDisponiveis}
        </div>
        <div className="text-sm text-gray-600">Ingressos Disponíveis</div>
      </div>
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <div className="text-2xl font-bold text-green-600">
          {formatPrice(evento.preco)}
        </div>
        <div className="text-sm text-gray-600">Preço por Ingresso</div>
      </div>
      <div className="text-center p-4 bg-orange-50 rounded-lg">
        <div className="text-2xl font-bold text-orange-600">
          {percentualVendido.toFixed(0)}%
        </div>
        <div className="text-sm text-gray-600">Vendidos</div>
      </div>
    </div>
  );
}

function EventoProgresso({
  ingressosVendidos,
  ingressosTotal,
  percentualVendido,
}: {
  ingressosVendidos: number;
  ingressosTotal: number;
  percentualVendido: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Vendidos: {ingressosVendidos}</span>
        <span>Total: {ingressosTotal}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentualVendido}%` }}
        ></div>
      </div>
    </div>
  );
}

function EventoTermos({ termos }: { termos: string }) {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertDescription>{termos}</AlertDescription>
    </Alert>
  );
}

function EventoFooter({ evento }: { evento: Evento }) {
  return (
    <CardFooter className="flex flex-col sm:flex-row gap-4">
      <Button
        className="flex-1"
        size="lg"
        disabled={evento.ingressosDisponiveis === 0}
        onClick={() => window.open(evento.linkPagamento, "_blank")}
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        {evento.ingressosDisponiveis > 0 ? "Comprar Ingresso" : "Esgotado"}
      </Button>
      <Button variant="outline" size="lg" asChild>
        <a href="/verificar">Verificar Ingresso</a>
      </Button>
    </CardFooter>
  );
}
