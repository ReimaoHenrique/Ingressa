export interface Evento {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  data: string;
  local: string;
  preco: number;
  ingressosDisponiveis: number;
  ingressosTotal: number;
  linkPagamento: string;
  termosUso: string;
}

export interface Ingresso {
  id: string;
  eventoId: string;
  cpf: string;
  nome: string;
  email: string;
  hash: string;
  dataCompra: string;
  status: 'ativo' | 'usado' | 'cancelado';
}

export interface Festa {
  id: string;
  nome: string;
  quantidadeTotal: number;
  quantidadeVendidos: number;
  valorUnitario: number;
  lucroTotal: number;
  lucroAtual: number;
  data: string;
  status: 'ativa' | 'finalizada' | 'cancelada';
}

export interface VerificarIngressoRequest {
  cpf?: string;
  nome?: string;
}

export interface VerificarIngressoResponse {
  sucesso: boolean;
  mensagem: string;
  ingresso?: Ingresso;
  hash?: string;
}

export interface AdminLoginRequest {
  hash: string;
}

export interface AdminLoginResponse {
  sucesso: boolean;
  token?: string;
  mensagem: string;
}

