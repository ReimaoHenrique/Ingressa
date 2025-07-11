import { NextRequest, NextResponse } from 'next/server';
import { festasMock } from '@/lib/mock-data';
import { ADMIN_HASH, MESSAGES } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    // Verifica autenticação via header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || token !== ADMIN_HASH) {
      return NextResponse.json(
        { 
          sucesso: false, 
          mensagem: 'Acesso negado. Token inválido.' 
        },
        { status: 401 }
      );
    }

    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      sucesso: true,
      data: festasMock,
      resumo: {
        totalFestas: festasMock.length,
        festasAtivas: festasMock.filter(f => f.status === 'ativa').length,
        festasFinalizadas: festasMock.filter(f => f.status === 'finalizada').length,
        lucroTotal: festasMock.reduce((sum, festa) => sum + festa.lucroAtual, 0)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar festas:', error);
    return NextResponse.json(
      { 
        sucesso: false, 
        mensagem: MESSAGES.ERRO_SERVIDOR 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verifica autenticação via header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || token !== ADMIN_HASH) {
      return NextResponse.json(
        { 
          sucesso: false, 
          mensagem: 'Acesso negado. Token inválido.' 
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { hash } = body;

    if (hash === ADMIN_HASH) {
      return NextResponse.json({
        sucesso: true,
        mensagem: MESSAGES.LOGIN_SUCESSO,
        token: ADMIN_HASH
      });
    } else {
      return NextResponse.json(
        { 
          sucesso: false, 
          mensagem: MESSAGES.LOGIN_INVALIDO 
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erro no login admin:', error);
    return NextResponse.json(
      { 
        sucesso: false, 
        mensagem: MESSAGES.ERRO_SERVIDOR 
      },
      { status: 500 }
    );
  }
}

