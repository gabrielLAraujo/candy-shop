import { PrismaClient } from '@prisma/client'
import fs from "fs";
import path from "path";

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados com imagens reais...')

  await prisma.candy.deleteMany({})
  await prisma.user.deleteMany({})
  console.log('🗑️ Dados existentes removidos')

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@alicedoces.com",
      role: "admin",
    },
  });
  console.log('👤 Usuário admin criado:', adminUser.email)

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

  const candies = [
    { nome: "Brigadeiro Gourmet", descricao: "Brigadeiro tradicional com chocolate belga.", preco: 2.5 },
    { nome: "Beijinho", descricao: "Doce de coco com leite condensado.", preco: 2.5 },
    { nome: "Cajuzinho", descricao: "Doce de amendoim com chocolate.", preco: 2.5 },
    { nome: "Olho de Sogra", descricao: "Doce de ameixa com coco.", preco: 2.5 },
    { nome: "Camafeu de Nozes", descricao: "Doce de nozes com cobertura de fondant.", preco: 2.5 },
    { nome: "Moranguinho", descricao: "Doce de morango com leite condensado.", preco: 2.5 },
    { nome: "Casadinho", descricao: "Meio brigadeiro, meio beijinho.", preco: 2.5 },
    { nome: "Bicho de Pé", descricao: "Doce de morango com chocolate branco.", preco: 2.5 },
    { nome: "Churros", descricao: "Doce de leite com açúcar e canela.", preco: 2.5 },
  ];

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

  console.log('✅ Seed concluído! 9 doces criados com imagens reais.')
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 