import { NextRequest, NextResponse } from 'next/server';
import { ingressosMock } from '@/lib/mock-data';
import { MESSAGES } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cpf, nome } = body;

    // Validação básica
    if (!cpf && !nome) {
      return NextResponse.json(
        { 
          sucesso: false, 
          mensagem: 'Por favor, forneça CPF ou nome para consulta.' 
        },
        { status: 400 }
      );
    }

    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Busca ingresso nos dados mockados
    let ingressoEncontrado;

    if (cpf) {
      ingressoEncontrado = ingressosMock.find(ingresso => 
        ingresso.cpf === cpf
      );
    } else if (nome) {
      ingressoEncontrado = ingressosMock.find(ingresso => 
        ingresso.nome.toLowerCase().includes(nome.toLowerCase())
      );
    }

    if (ingressoEncontrado) {
      return NextResponse.json({
        sucesso: true,
        mensagem: `${MESSAGES.INGRESSO_ENCONTRADO} ${ingressoEncontrado.hash}`,
        data: {
          ingresso: ingressoEncontrado,
          hash: ingressoEncontrado.hash
        }
      });
    } else {
      return NextResponse.json({
        sucesso: false,
        mensagem: MESSAGES.INGRESSO_NAO_ENCONTRADO
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro ao consultar ingresso:', error);
    return NextResponse.json(
      { 
        sucesso: false, 
        mensagem: MESSAGES.ERRO_SERVIDOR 
      },
      { status: 500 }
    );
  }
}

