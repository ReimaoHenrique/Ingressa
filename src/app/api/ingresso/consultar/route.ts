import { NextRequest, NextResponse } from "next/server";
import { MESSAGES } from "@/lib/constants";
import { normalizarTexto } from "@/lib/utils";
import { IngressoExterno, ApiExternaResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cpf, nome } = body;

    // Validação básica
    if (!cpf && !nome) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: "Por favor, forneça CPF ou nome para consulta.",
        },
        { status: 400 }
      );
    }

    // Busca ingressos da API externa
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

    const apiResponse: ApiExternaResponse = await response.json();
    const ingressos: IngressoExterno[] = apiResponse.data;

    // Busca ingresso
    let ingressoEncontrado;

    if (cpf && nome) {
      // Se CPF e nome foram fornecidos, busca por ambos
      const nomeNormalizado = normalizarTexto(nome);
      ingressoEncontrado = ingressos.find((ingresso) => {
        const nomeIngressoNormalizado = normalizarTexto(ingresso.nome);
        return (
          ingresso.cpf === cpf &&
          nomeIngressoNormalizado.includes(nomeNormalizado)
        );
      });
    } else if (cpf) {
      // Se apenas CPF foi fornecido, busca apenas por CPF
      ingressoEncontrado = ingressos.find((ingresso) => ingresso.cpf === cpf);
    } else {
      // Busca apenas por nome
      const nomeNormalizado = normalizarTexto(nome);
      ingressoEncontrado = ingressos.find((ingresso) => {
        const nomeIngressoNormalizado = normalizarTexto(ingresso.nome);
        return nomeIngressoNormalizado.includes(nomeNormalizado);
      });
    }

    if (ingressoEncontrado) {
      return NextResponse.json({
        sucesso: true,
        mensagem: `Ingresso encontrado para ${ingressoEncontrado.nome}${
          ingressoEncontrado.cpf ? ` (CPF: ${ingressoEncontrado.cpf})` : ""
        }`,
        data: {
          ingresso: {
            id: ingressoEncontrado.id,
            eventoId: ingressoEncontrado.eventoId,
            cpf: ingressoEncontrado.cpf || "não informado",
            nome: ingressoEncontrado.nome,
            email: ingressoEncontrado.email,
            hash: ingressoEncontrado.hash,
            dataCompra: ingressoEncontrado.dataCompra,
            status: ingressoEncontrado.status,
          },
          hash: ingressoEncontrado.hash,
        },
      });
    } else {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: MESSAGES.INGRESSO_NAO_ENCONTRADO,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Erro ao consultar ingresso:", error);
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
