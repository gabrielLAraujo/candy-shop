import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed das estruturas novas...');

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

  console.log("👤 Usuário admin criado:", adminUser.email);

  // Verifica se já existem caixas
  const existingBoxes = await prisma.box.count();
  
  if (existingBoxes === 0) {
    // Cria as 5 caixas padrão apenas se não existirem
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

    console.log("📦 5 caixas padrão criadas");
  } else {
    console.log(`📦 ${existingBoxes} caixas já existem no banco`);
  }

  console.log('✅ Seed das estruturas concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 