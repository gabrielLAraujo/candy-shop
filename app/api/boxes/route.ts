import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('🔍 Buscando caixas no banco...');
    
    const boxes = await prisma.box.findMany({
      orderBy: {
        size: 'asc'
      }
    });
    
    console.log(`✅ Encontradas ${boxes.length} caixas`);
    return NextResponse.json(boxes);
  } catch (error) {
    console.error('❌ Erro ao buscar caixas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, size, price, description, emoji, weight } = body;

    if (!name || !size || !price || !description || !emoji || !weight) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (size <= 0 || price <= 0 || weight <= 0) {
      return NextResponse.json(
        { error: 'Quantidade, preço e peso devem ser maiores que zero' },
        { status: 400 }
      );
    }

    const box = await prisma.box.create({
      data: {
        name,
        size: parseInt(size),
        price: parseFloat(price),
        description,
        emoji,
        weight: parseFloat(weight)
      }
    });

    return NextResponse.json(box, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar caixa:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 