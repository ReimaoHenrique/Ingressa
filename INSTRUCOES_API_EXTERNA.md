# 📋 Instruções para API Externa

## 🎯 Status Atual

O sistema está **funcionando** com dados mockados! Você pode testar imediatamente.

## 🧪 Como Testar Agora

1. **Acesse**: http://localhost:3000/verificar
2. **Teste com os dados mockados**:

   - CPF: `111.222.333-44` → Nome: João Felipe
   - CPF: `555.666.777-88` → Nome: Maria Silva
   - CPF: `999.888.777-66` → Nome: Pedro Santos
   - CPF: `123.456.789-00` → Nome: Ana Oliveira
   - CPF: `987.654.321-00` → Nome: Carlos Ferreira

3. **Teste busca por nome** (ignora acentos e maiúsculas):
   - `joao felipe` → encontra João Felipe
   - `João Felipe` → encontra João Felipe
   - `maria` → encontra Maria Silva
   - `pedro santos` → encontra Pedro Santos

## 🔌 Configurando a API Externa

### 1. Crie sua API em localhost:3002

Exemplo com Express.js:

```javascript
const express = require("express");
const app = express();
const port = 3002;

app.use(express.json());

// Endpoint que retorna a lista de ingressos
app.get("/api/ingressos", (req, res) => {
  const ingressos = [
    {
      cpf: "111.222.333-44",
      nome: "João Felipe",
    },
    {
      cpf: "555.666.777-88",
      nome: "Maria Silva",
    },
    {
      cpf: "999.888.777-66",
      nome: "Pedro Santos",
    },
  ];

  res.json(ingressos);
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
```

### 2. Estrutura JSON Esperada

```json
[
  {
    "cpf": "111.222.333-44",
    "nome": "João Felipe"
  },
  {
    "cpf": "555.666.777-88",
    "nome": "Maria Silva"
  }
]
```

### 3. Teste a API Externa

```bash
curl http://localhost:3002/api/ingressos
```

## 🔄 Como Funciona

1. **Primeiro**: Sistema tenta conectar com `localhost:3002/api/ingressos`
2. **Se falhar**: Usa dados mockados automaticamente
3. **Se funcionar**: Usa dados da API externa

## 📝 Logs no Console

Você verá no console do servidor:

- `"Usando dados da API externa"` → API externa funcionando
- `"API externa não disponível, usando dados mockados"` → Usando dados mockados

## ✅ Funcionalidades Implementadas

- ✅ Busca por CPF (exata)
- ✅ Busca por nome (ignora acentos e maiúsculas)
- ✅ Fallback automático para dados mockados
- ✅ Interface responsiva
- ✅ Tratamento de erros
- ✅ Logs informativos

## 🚀 Próximos Passos

1. **Teste o sistema atual** com dados mockados
2. **Configure sua API externa** em localhost:3002
3. **Substitua os dados mockados** pelos seus dados reais
4. **Teste a integração** completa

---

**O sistema está pronto para uso!** 🎉
