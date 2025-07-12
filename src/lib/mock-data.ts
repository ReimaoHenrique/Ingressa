import { Evento, Ingresso, Festa } from "@/types";

export const eventoMock: Evento = {
  id: "1",
  nome: "Festival de Música Eletrônica 2025",
  descricao:
    "Uma noite inesquecível com os melhores DJs do cenário eletrônico nacional e internacional. Prepare-se para uma experiência única com som de alta qualidade e uma produção espetacular.",
  imagem: "/events/boreal.jpg",
  data: "2025-08-15T20:00:00Z",
  local: "Arena Music Hall - São Paulo",
  preco: 120.0,
  ingressosDisponiveis: 150,
  ingressosTotal: 500,
  linkPagamento: "https://pagamento.exemplo.com/evento/1",
  termosUso:
    "Ao comprar você concorda com nossos termos de entrada. Proibido menores de 18 anos. Documento obrigatório.",
};

export const ingressosMock: Ingresso[] = [
  {
    id: "ing_001",
    eventoId: "1",
    cpf: "123.456.789-00",
    nome: "João Silva",
    email: "joao@email.com",
    hash: "abc123def456",
    dataCompra: "2025-07-01T10:30:00Z",
    status: "ativo",
  },
  {
    id: "ing_002",
    eventoId: "1",
    cpf: "987.654.321-00",
    nome: "Maria Santos",
    email: "maria@email.com",
    hash: "xyz789uvw456",
    dataCompra: "2025-07-02T14:15:00Z",
    status: "ativo",
  },
  {
    id: "ing_003",
    eventoId: "1",
    cpf: "456.789.123-00",
    nome: "Pedro Oliveira",
    email: "pedro@email.com",
    hash: "def456ghi789",
    dataCompra: "2025-07-03T09:45:00Z",
    status: "ativo",
  },
];

export const festasMock: Festa[] = [
  {
    id: "1",
    nome: "Festival de Música Eletrônica 2025",
    quantidadeTotal: 500,
    quantidadeVendidos: 350,
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
  {
    id: "3",
    nome: "Festa de Ano Novo 2025",
    quantidadeTotal: 1000,
    quantidadeVendidos: 1000,
    valorUnitario: 200.0,
    lucroTotal: 200000.0,
    lucroAtual: 200000.0,
    data: "2024-12-31",
    status: "finalizada",
  },
];
