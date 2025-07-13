import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Valida se pelo menos um campo foi fornecido
    if (!body.email && !body.cpf) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: "Por favor, forneça pelo menos um campo (email ou CPF).",
        },
        { status: 400 }
      );
    }

    // Faz a requisição para a API externa
    const response = await fetch(API_ENDPOINTS.VERIFICAR_CONVIDADO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Erro na API externa: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao verificar convidado:", error);
    return NextResponse.json(
      {
        sucesso: false,
        mensagem: "Erro ao conectar com o servidor. Tente novamente.",
      },
      { status: 500 }
    );
  }
}
