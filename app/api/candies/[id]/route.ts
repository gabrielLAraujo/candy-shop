import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { price } = body;

    if (!price || price <= 0) {
      return NextResponse.json(
        { error: 'Preço deve ser maior que zero' },
        { status: 400 }
      );
    }

    const candy = await prisma.candy.update({
      where: { id },
      data: { price: parseFloat(price) }
    });

    return NextResponse.json(candy);
  } catch (error) {
    console.error('Erro ao atualizar doce:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.candy.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Doce removido com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar doce:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 