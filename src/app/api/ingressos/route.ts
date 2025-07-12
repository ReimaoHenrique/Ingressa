import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Busca da API externa
    const response = await fetch(
      "https://koi-pretty-quietly.ngrok-free.app/api/ingressos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na API externa: ${response.status}`);
    }

    const apiResponse = await response.json();
    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error("Erro ao buscar ingressos da API externa:", error);
    return NextResponse.json(
      {
        sucesso: false,
        mensagem:
          "Erro ao conectar com o servidor externo. Verifique se a API está disponível.",
      },
      { status: 500 }
    );
  }
}
