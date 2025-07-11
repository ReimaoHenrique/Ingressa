import { NextResponse } from 'next/server';
import { eventoMock } from '@/lib/mock-data';

export async function GET() {
  try {
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      sucesso: true,
      data: {
        eventoId: eventoMock.id,
        ingressosDisponiveis: eventoMock.ingressosDisponiveis,
        ingressosTotal: eventoMock.ingressosTotal,
        preco: eventoMock.preco,
        linkPagamento: eventoMock.linkPagamento
      }
    });
  } catch (error) {
    console.error('Erro ao buscar ingressos disponíveis:', error);
    return NextResponse.json(
      { 
        sucesso: false, 
        mensagem: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}

