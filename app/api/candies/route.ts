import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const candies = await prisma.candy.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });
    
    return NextResponse.json(candies);
  } catch (error) {
    console.error('Erro ao buscar doces:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, description, image } = body;

    if (!name || !price || !description) {
      return NextResponse.json(
        { error: 'Nome, preço e descrição são obrigatórios' },
        { status: 400 }
      );
    }

    const candy = await prisma.candy.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        image: image || null
      }
    });

    return NextResponse.json(candy, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar doce:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 