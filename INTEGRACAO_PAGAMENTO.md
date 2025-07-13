# Integração com API de Pagamento

## Visão Geral

Este projeto integra com uma API externa de pagamento (Mercado Pago) para gerar links de pagamento para compra de ingressos.

## Fluxo de Pagamento

### 1. Criação do Convidado

Quando o usuário preenche o formulário de compra de ingresso:

```typescript
// POST /api/eventos
{
  "nome": "Henrique Reimao",
  "email": "Henrique@email.com",
  "cpf": "12345678901" // opcional
}
```

**Resposta:**

```json
{
  "sucesso": true,
  "data": {
    "id": "uuid-do-convidado-gerado",
    "nome": "Henrique Reimao",
    "email": "Henrique@email.com",
    "cpf": "12345678901",
    "eventoId": "1"
  }
}
```

### 2. Criação do Link de Pagamento

Após criar o convidado, o sistema gera um link de pagamento:

```typescript
// POST https://jvdpz4zf-3000.brs.devtunnels.ms/payment/preference
{
  "title": "Boreal Fest",
  "description": "Uma festa",
  "quantity": 1,
  "unit_price": 1.05,
  "currency_id": "BRL",
  "external_reference": "uuid-do-convidado-gerado",
  "payer": {
    "name": "Henrique Reimao",
    "email": "Henrique@email.com"
  }
}
```

**Resposta:**

```json
{
  "id": "159972839-c8981514-5248-422d-bea5-ba8c6fa7fe66",
  "init_point": "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=159972839-c8981514-5248-422d-bea5-ba8c6fa7fe66",
  "sandbox_init_point": "https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=159972839-c8981514-5248-422d-bea5-ba8c6fa7fe66",
  "client_id": "4564619976609369",
  "collector_id": 159972839,
  "operation_type": "regular_payment",
  "additional_info": "",
  "external_reference": "uuid-do-convidado-gerado",
  "date_created": "2025-07-13T19:33:40.852-04:00",
  "payer": {
    "name": "Henrique Reimao",
    "email": "Henrique@email.com"
  }
}
```

## Arquivos Principais

### `src/lib/payment.ts`

Contém a função `createPaymentPreference()` que faz a requisição para a API externa de pagamento.

### `src/components/TicketForm.tsx`

Componente que gerencia o formulário de compra e orquestra o fluxo:

1. Cria o convidado via API
2. Gera o link de pagamento
3. Abre o link em nova aba

### `src/app/api/eventos/route.ts`

API route que faz proxy para a API externa de criação de convidados.

## Tipos TypeScript

### `PaymentPreferenceRequest`

```typescript
interface PaymentPreferenceRequest {
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
  external_reference: string;
  payer: {
    name: string;
    email: string;
  };
}
```

### `PaymentPreferenceResponse`

```typescript
interface PaymentPreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  client_id: string;
  collector_id: number;
  operation_type: string;
  additional_info: string;
  external_reference: string;
  date_created: string;
  payer: {
    name: string;
    email: string;
  };
}
```

## Configuração

### URLs das APIs

- **API Externa de Eventos:** `https://koi-pretty-quietly.ngrok-free.app:`
- **API de Pagamento:** `https://jvdpz4zf-3000.brs.devtunnels.ms/payment/preference`

### Preços e Configurações

- **Preço unitário:** R$ 1,05
- **Moeda:** BRL (Real Brasileiro)
- **Quantidade:** 1 ingresso por compra
- **Título:** "Boreal Fest"
- **Descrição:** "Uma festa"

## Tratamento de Erros

O sistema inclui tratamento robusto de erros:

- Validação de CPF
- Validação de email
- Tratamento de erros de rede
- Logs detalhados para debugging

## Logs e Debugging

O sistema gera logs detalhados em:

- Console do navegador (para debugging do frontend)
- Console do servidor (para debugging das API routes)

Principais pontos de log:

- Payload enviado para a API de pagamento
- Resposta da API de pagamento
- Status das requisições
- Links de pagamento gerados
