import { Evento, Festa } from "@/types";

export const eventoMock: Evento = {
  id: "1",
  nome: "Festival de Música Eletrônica 2025",
  descricao:
    "Uma noite inesquecível com os melhores DJs do cenário eletrônico nacional e internacional. Prepare-se para uma experiência única com som de alta qualidade e uma produção espetacular.",
  imagem: "/events/boreal.jpg",
  data: "2025-08-15T20:00:00Z",
  local: "Arena Music Hall - São Paulo",
  preco: 200,
  ingressosDisponiveis: 150,
  ingressosTotal: 500,
  termosUsoTitle:
    "Ao comprar você concorda com nossos termos de entrada. Proibido menores de 18 anos. Documento obrigatório.",
};

export const festasMock: Festa[] = [
  {
    id: "1",
    nome: "Festival de Música Eletrônica 2025",
    quantidadeTotal: 1000,
    quantidadeVendidos: 500,
    valorUnitario: 120.0,
    lucroTotal: 60000.0,
    lucroAtual: 42000.0,
    data: "2025-08-15",
    status: "ativa",
  },
  {
    id: "2",
    nome: "Show de Rock Nacional",
    quantidadeTotal: 300,
    quantidadeVendidos: 280,
    valorUnitario: 80.0,
    lucroTotal: 24000.0,
    lucroAtual: 22400.0,
    data: "2025-09-20",
    status: "ativa",
  },
];
