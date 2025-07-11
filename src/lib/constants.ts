// Hash de exemplo para login de admin
export const ADMIN_HASH = "d02f312c49a3e7b62daccf1f6e925b1872cf4e891ea13d26d4d52b86d1448579";

// URLs da API (mock)
export const API_ENDPOINTS = {
  INGRESSOS_DISPONIVEIS: "/api/ingressos/disponiveis",
  CONSULTAR_INGRESSO: "/api/ingresso/consultar",
  ADMIN_FESTAS: "/api/admin/festas",
} as const;

// Mensagens padrão
export const MESSAGES = {
  INGRESSO_ENCONTRADO: "Ingresso ativo. Hash:",
  INGRESSO_NAO_ENCONTRADO: "Nenhum ingresso encontrado.",
  LOGIN_INVALIDO: "Hash de acesso inválido.",
  LOGIN_SUCESSO: "Login realizado com sucesso.",
  ERRO_SERVIDOR: "Erro interno do servidor. Tente novamente.",
} as const;

