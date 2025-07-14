import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️ Removendo dados existentes...')
  await prisma.candy.deleteMany()
  await prisma.box.deleteMany()
  console.log('🗑️ Dados existentes removidos')

  // Cria usuário admin se não existir
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@alicedoces.com" },
    update: {},
    create: {
      email: "admin@alicedoces.com",
      name: "Administrador",
      role: "admin",
    },
  });

  console.log("Usuário admin criado:", adminUser);

  // Cria as 5 caixas padrão
  const defaultBoxes = [
    {
      name: "Caixa com 4 Doces",
      size: 4,
      price: 10.0,
      description: "Caixa personalizada com 4 doces da sua escolha",
      emoji: "📦",
      weight: 200,
    },
    {
      name: "Caixa com 8 Doces",
      size: 8,
      price: 20.0,
      description: "Caixa personalizada com 8 doces da sua escolha",
      emoji: "🎁",
      weight: 400,
    },
    {
      name: "Caixa com 12 Doces",
      size: 12,
      price: 30.0,
      description: "Caixa personalizada com 12 doces da sua escolha",
      emoji: "🎁",
      weight: 600,
    },
    {
      name: "Caixa com 50 Doces",
      size: 50,
      price: 120.0,
      description: "Caixa personalizada com 50 doces da sua escolha",
      emoji: "📦",
      weight: 2500,
    },
    {
      name: "Caixa com 100 Doces",
      size: 100,
      price: 220.0,
      description: "Caixa personalizada com 100 doces da sua escolha",
      emoji: "🎁",
      weight: 5000,
    },
  ];

  for (const box of defaultBoxes) {
    await prisma.box.create({
      data: box,
    });
  }

  console.log("📦 Caixas padrão criadas");

  // Lê os 9 arquivos base64
  const base64Files = [
    "WhatsApp Image 2025-07-10 at 19.44.00.txt",
    "WhatsApp Image 2025-07-10 at 19.44.01.txt",
    "WhatsApp Image 2025-07-10 at 19.44.01 (1).txt",
    "WhatsApp Image 2025-07-10 at 19.44.01 (2).txt",
    "WhatsApp Image 2025-07-10 at 19.44.01 (3).txt",
    "WhatsApp Image 2025-07-10 at 19.44.02.txt",
    "WhatsApp Image 2025-07-10 at 19.44.02 (1).txt",
    "WhatsApp Image 2025-07-10 at 19.44.02 (2).txt",
    "WhatsApp Image 2025-07-10 at 19.44.02 (3).txt",
  ];
  const base64List = base64Files.map((file) => {
    const filePath = path.join(process.cwd(), "public", "images", file);
    return fs.readFileSync(filePath, "utf-8").trim();
  });

  // Dados dos doces
  const candies = [
    {
      nome: "Brigadeiro",
      descricao: "Brigadeiro tradicional feito com chocolate e granulado",
      preco: 2.50,
    },
    {
      nome: "Beijinho",
      descricao: "Beijinho de coco ralado",
      preco: 2.50,
    },
    {
      nome: "Cajuzinho",
      descricao: "Cajuzinho de amendoim",
      preco: 2.50,
    },
    {
      nome: "Olho de Sogra",
      descricao: "Olho de sogra com ameixa e coco",
      preco: 2.50,
    },
    {
      nome: "Quindim",
      descricao: "Quindim de forno",
      preco: 2.50,
    },
    {
      nome: "Bem Casado",
      descricao: "Bem casado tradicional",
      preco: 2.50,
    },
    {
      nome: "Pudim",
      descricao: "Pudim de leite condensado",
      preco: 2.50,
    },
    {
      nome: "Trufa",
      descricao: "Trufa de chocolate",
      preco: 2.50,
    },
    {
      nome: "Palha Italiana",
      descricao: "Palha italiana com chocolate",
      preco: 2.50,
    },
  ];

  // Cria os doces com as imagens reais
  for (let i = 0; i < candies.length; i++) {
    await prisma.candy.create({
      data: {
        name: candies[i].nome,
        description: candies[i].descricao,
        price: candies[i].preco,
        image: base64List[i],
      },
    });
  }

  console.log("🍬 Doces criados com imagens reais");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 