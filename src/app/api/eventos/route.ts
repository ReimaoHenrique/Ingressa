import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://jvdpz4zf-3002.brs.devtunnels.ms";

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/eventos/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro ao buscar eventos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/api/eventos/convidados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        eventoId: "1",
        nome: body.nome,
        email: body.email,
        ...(body.cpf && { cpf: body.cpf }), // Só envia CPF se existir
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: errorData.mensagem || "Erro ao processar compra",
        },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("Resposta da API externa:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro na API de eventos:", error);
    return NextResponse.json(
      {
        sucesso: false,
        mensagem: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
