const fs = require("fs");
const path = require("path");

// Função para converter imagem para base64
function imageToBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64String = imageBuffer.toString("base64");
    const mimeType = getMimeType(imagePath);
    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error(`Erro ao converter ${imagePath}:`, error.message);
    return null;
  }
}

// Função para determinar o tipo MIME
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };
  return mimeTypes[ext] || "image/jpeg";
}

// Lista de imagens para converter
const images = [
  {
    name: "Brigadeiro Gourmet",
    path: "public/images/WhatsApp Image 2025-07-10 at 19.44.02 (3).jpeg",
  },
  {
    name: "Beijinho Especial",
    path: "public/images/WhatsApp Image 2025-07-10 at 19.44.02 (2).jpeg",
  },
  {
    name: "Cajuzinho Premium",
    path: "public/images/WhatsApp Image 2025-07-10 at 19.44.02 (1).jpeg",
  },
  {
    name: "Bem Casado",
    path: "public/images/WhatsApp Image 2025-07-10 at 19.44.02.jpeg",
  },
  {
    name: "Quindim",
    path: "public/images/WhatsApp Image 2025-07-10 at 19.44.01 (3).jpeg",
  },
  {
    name: "Pudim de Leite",
    path: "public/images/WhatsApp Image 2025-07-10 at 19.44.01 (2).jpeg",
  },
  {
    name: "Trufa de Chocolate",
    path: "public/images/WhatsApp Image 2025-07-10 at 19.44.01 (1).jpeg",
  },
  {
    name: "Bombom de Morango",
    path: "public/images/WhatsApp Image 2025-07-10 at 19.44.01.jpeg",
  },
  {
    name: "Palha Italiana",
    path: "public/images/WhatsApp Image 2025-07-10 at 19.44.00.jpeg",
  },
];

console.log("🖼️ Convertendo imagens para base64...\n");

const base64Images = [];

images.forEach((image, index) => {
  const base64 = imageToBase64(image.path);
  if (base64) {
    base64Images.push({
      name: image.name,
      base64: base64,
    });
    console.log(`✅ ${image.name}: Convertido com sucesso`);
  } else {
    console.log(`❌ ${image.name}: Erro na conversão`);
  }
});

// Gerar código para o seed
console.log("\n📝 Código para o seed:");
console.log("const candies = [");
base64Images.forEach((image, index) => {
  console.log(`  {`);
  console.log(`    name: '${image.name}',`);
  console.log(`    description: 'Descrição do ${image.name}',`);
  console.log(`    price: 2.50,`);
  console.log(`    image: '${image.base64}'`);
  console.log(`  }${index < base64Images.length - 1 ? "," : ""}`);
});
console.log("];");

console.log(
  `\n🎉 Conversão concluída! ${base64Images.length} imagens convertidas.`
);
