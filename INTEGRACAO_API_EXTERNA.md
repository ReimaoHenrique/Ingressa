# Integração com API Externa

## Visão Geral

Esta aplicação foi integrada com a API externa `https://koi-pretty-quietly.ngrok-free.app` para buscar eventos e processar compras de ingressos.

## Endpoints Utilizados

### 1. Buscar Eventos

- **URL**: `GET /api/eventos`
- **Descrição**: Retorna todos os eventos disponíveis
- **Resposta Esperada**:

```json
{
  "sucesso": true,
  "data": [
    {
      "id": "string",
      "nome": "string",
      "descricao": "string",
      "imagem": "string | null",
      "data": "string (ISO 8601)",
      "local": "string",
      "preco": "number",
      "ingressosDisponiveis": "number",
      "ingressosTotal": "number",
      "linkPagamento": "string",
      "termosUso": "string",
      "status": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

### 2. Comprar Ingresso

- **URL**: `POST /api/eventos/convidados`
- **Descrição**: Processa a compra de um ingresso e retorna link de pagamento
- **Payload**:

```json
{
  "nome": "string",
  "email": "string",
  "cpf": "string (apenas números)",
  "eventoId": "1"
}
```

- **Resposta Esperada**:

```json
{
  "sucesso": true,
  "data": {
    "linkPagamento": "string"
  }
}
```

## Arquivos Modificados/Criados

### 1. `src/lib/api.ts`

- Criado para gerenciar todas as chamadas da API externa
- Funções: `buscarEventos()` e `buscarEventoPorId()`
- Conversão automática dos dados da API para o formato interno

### 2. `src/lib/hooks/useEventos.ts`

- Hook personalizado para gerenciar o estado dos eventos
- Inclui loading, error handling e fallback para dados mockados

### 3. `src/components/TicketForm.tsx`

- Atualizado para integrar diretamente com a API externa
- Validação de CPF melhorada
- Formatação automática de CPF
- Estados de loading e erro
- Abertura automática do link de pagamento

### 4. `src/app/page.tsx`

- Atualizado para usar dados da API externa
- Fallback para dados mockados em caso de erro
- Estados de loading e erro

### 5. `next.config.ts`

- Configuração para permitir imagens da API externa

## Funcionalidades Implementadas

### ✅ Busca de Eventos

- Carregamento automático de eventos da API
- Fallback para dados mockados em caso de erro
- Estados de loading e erro

### ✅ Compra de Ingressos

- Formulário completo com validações
- Integração com API externa
- Validação de CPF com algoritmo oficial
- Formatação automática de CPF
- Estados de loading e sucesso/erro
- Abertura automática do link de pagamento

### ✅ Tratamento de Erros

- Fallback para dados mockados
- Mensagens de erro amigáveis
- Retry automático em caso de falha

### ✅ UX/UI

- Loading states
- Mensagens de sucesso/erro
- Formatação automática de campos
- Validação em tempo real

## Como Usar

1. **Desenvolvimento**: Execute `npm run dev`
2. **Produção**: Execute `npm run build && npm start`

A aplicação irá automaticamente:

- Buscar eventos da API externa
- Exibir o primeiro evento disponível
- Permitir compra de ingressos
- Fallback para dados mockados se a API estiver indisponível

## Configuração

A URL da API externa está configurada em:

- `src/lib/api.ts` (constante `API_BASE_URL`)
- `src/components/TicketForm.tsx` (URL direta)

Para alterar a URL da API, modifique essas constantes.

## Tratamento de Erros

A aplicação possui tratamento robusto de erros:

- Fallback automático para dados mockados
- Mensagens de erro amigáveis
- Estados de loading para melhor UX
- Validação de dados antes do envio

## Validações Implementadas

### CPF

- Validação completa com algoritmo oficial
- Formatação automática (000.000.000-00)
- Verificação de dígitos verificadores

### Email

- Validação de formato
- Verificação de domínio

### Campos Obrigatórios

- Nome completo
- Email
- CPF
- Aceite dos termos de uso
