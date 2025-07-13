import { useState, useEffect } from "react";
import { Evento } from "@/types";
import { buscarEventos } from "@/lib/api";
import { eventoMock } from "@/lib/mock-data";

export function useEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventosData = await buscarEventos();
        setEventos(eventosData);
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
        setError("Erro ao carregar eventos. Tente novamente mais tarde.");
        // Fallback para dados mockados em caso de erro
        setEventos([eventoMock]);
      } finally {
        setLoading(false);
      }
    };

    carregarEventos();
  }, []);

  const recarregarEventos = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventosData = await buscarEventos();
      setEventos(eventosData);
    } catch (err) {
      console.error("Erro ao recarregar eventos:", err);
      setError("Erro ao recarregar eventos. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return {
    eventos,
    loading,
    error,
    recarregarEventos,
  };
}
