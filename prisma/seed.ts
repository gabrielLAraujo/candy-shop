import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes
  await prisma.candy.deleteMany({})
  console.log('🗑️ Dados existentes removidos')

  // Ler base64 das imagens
  const images = await Promise.all([
    fs.readFile('public/images/WhatsApp Image 2025-07-10 at 19.44.00.txt', 'utf8'),
    fs.readFile('public/images/WhatsApp Image 2025-07-10 at 19.44.01.txt', 'utf8'),
    fs.readFile('public/images/WhatsApp Image 2025-07-10 at 19.44.02.txt', 'utf8'),
    fs.readFile('public/images/WhatsApp Image 2025-07-10 at 19.44.01 (1).txt', 'utf8'),
    fs.readFile('public/images/WhatsApp Image 2025-07-10 at 19.44.01 (2).txt', 'utf8'),
    fs.readFile('public/images/WhatsApp Image 2025-07-10 at 19.44.01 (3).txt', 'utf8'),
    fs.readFile('public/images/WhatsApp Image 2025-07-10 at 19.44.02 (1).txt', 'utf8'),
    fs.readFile('public/images/WhatsApp Image 2025-07-10 at 19.44.02 (2).txt', 'utf8'),
    fs.readFile('public/images/WhatsApp Image 2025-07-10 at 19.44.02 (3).txt', 'utf8'),
  ])

  // Criar doces baseados no mock atual com imagens em base64
  const candies = [
    {
      name: 'Brigadeiro Gourmet',
      description: 'Brigadeiro artesanal com chocolate belga',
      price: 2.50,
      image: images[0].trim()
    },
    {
      name: 'Beijinho Especial',
      description: 'Beijinho cremoso com coco ralado',
      price: 2.50,
      image: images[1].trim()
    },
    {
      name: 'Cajuzinho Premium',
      description: 'Cajuzinho artesanal com amendoim',
      price: 2.50,
      image: images[2].trim()
    },
    {
      name: 'Bem Casado',
      description: 'Bem casado tradicional com recheio cremoso',
      price: 2.50,
      image: images[3].trim()
    },
    {
      name: 'Quindim',
      description: 'Quindim cremoso com coco',
      price: 2.50,
      image: images[4].trim()
    },
    {
      name: 'Pudim de Leite',
      description: 'Pudim de leite condensado cremoso',
      price: 2.50,
      image: images[5].trim()
    },
    {
      name: 'Trufa de Chocolate',
      description: 'Trufa de chocolate belga',
      price: 2.50,
      image: images[6].trim()
    },
    {
      name: 'Bombom de Morango',
      description: 'Bombom recheado com morango',
      price: 2.50,
      image: images[7].trim()
    },
    {
      name: 'Palha Italiana',
      description: 'Palha italiana com chocolate e biscoito',
      price: 2.50,
      image: images[8].trim()
    }
  ]

  // Inserir doces no banco
  for (const candy of candies) {
    await prisma.candy.create({
      data: candy
    })
  }

  console.log(`✅ ${candies.length} doces criados com sucesso!`)
  console.log('🎉 Seed concluído!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 