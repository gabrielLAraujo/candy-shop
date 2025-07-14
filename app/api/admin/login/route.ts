import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SESSION_COOKIE = 'admin_session';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  
  console.log('Tentativa de login:', { username, password });
  
  try {
    console.log('Buscando usuário no banco...');
    
    // Teste simples primeiro
    const allUsers = await prisma.user.findMany();
    console.log('Todos os usuários:', allUsers);
    
    const user = await prisma.user.findFirst({
      where: {
        email: username,
      },
    });
    
    console.log('Usuário encontrado:', user);

    if (user && password === 'doces2024') {
      console.log('Login bem-sucedido');
      const response = NextResponse.json({ ok: true });
      response.cookies.set(SESSION_COOKIE, 'active', {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 8, // 8 horas
      });
      return response;
    }
    
    console.log('Credenciais inválidas');
    return NextResponse.json({ ok: false, error: 'Credenciais inválidas' }, { status: 401 });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json({ ok: false, error: 'Erro interno do servidor' }, { status: 500 });
  }
} 