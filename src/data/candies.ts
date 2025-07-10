export interface Candy {
  id: string;
  name: string;
  emoji: string;
  color: string;
  price: number;
  description: string;
  category: 'chocolate' | 'gummy' | 'hard' | 'soft' | 'special';
  available: boolean;
  imageUrl: string;
  videoUrl?: string;
}

export const candies: Candy[] = [
  {
    id: "chocolate-1",
    name: "Chocolate",
    emoji: "🍫",
    color: "from-yellow-400 to-orange-500",
    price: 5.50,
    description: "Chocolate cremoso e delicioso",
    category: "chocolate",
    available: true,
    imageUrl: "/images/chocolate.jpg",
    videoUrl: "/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
  },
  {
    id: "gummy-bears-1",
    name: "Gummy Bears",
    emoji: "🐻",
    color: "from-red-400 to-pink-500",
    price: 3.80,
    description: "Ursinhos de goma coloridos",
    category: "gummy",
    available: true,
    imageUrl: "/images/gummy-bears.jpg",
    videoUrl: "/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
  },
  {
    id: "lollipop-1",
    name: "Lollipop",
    emoji: "🍭",
    color: "from-pink-400 to-purple-500",
    price: 2.90,
    description: "Pirulito colorido e saboroso",
    category: "hard",
    available: true,
    imageUrl: "/images/lollipop.jpg",
    videoUrl: "/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
  },
  {
    id: "jelly-beans-1",
    name: "Jelly Beans",
    emoji: "🫘",
    color: "from-green-400 to-blue-500",
    price: 4.20,
    description: "Feijões de gelatina multicoloridos",
    category: "soft",
    available: true,
    imageUrl: "/images/jelly-beans.jpg",
    videoUrl: "/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
  },
  {
    id: "marshmallow-1",
    name: "Marshmallow",
    emoji: "☁️",
    color: "from-white to-gray-200",
    price: 3.50,
    description: "Marshmallow macio e fofinho",
    category: "soft",
    available: true,
    imageUrl: "/images/marshmallow.jpg",
    videoUrl: "/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
  },
  {
    id: "caramel-1",
    name: "Caramel",
    emoji: "🍯",
    color: "from-amber-400 to-yellow-500",
    price: 4.80,
    description: "Caramelo dourado e cremoso",
    category: "special",
    available: true,
    imageUrl: "/images/caramel.jpg",
    videoUrl: "/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
  },
  {
    id: "licorice-1",
    name: "Licorice",
    emoji: "🖤",
    color: "from-gray-700 to-black",
    price: 3.20,
    description: "Alcaçuz tradicional",
    category: "hard",
    available: true,
    imageUrl: "/images/licorice.jpg",
    videoUrl: "/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
  },
  {
    id: "cotton-candy-1",
    name: "Cotton Candy",
    emoji: "🎪",
    color: "from-pink-300 to-purple-300",
    price: 6.50,
    description: "Algodão doce colorido",
    category: "special",
    available: true,
    imageUrl: "/images/cotton-candy.jpg",
    videoUrl: "/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
  }
];

// Função para adicionar novo doce
export const addCandy = (newCandy: Omit<Candy, 'id'>): Candy => {
  const id = `${newCandy.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
  const candy: Candy = { ...newCandy, id };
  candies.push(candy);
  return candy;
};

// Função para atualizar preço
export const updateCandyPrice = (id: string, newPrice: number): Candy | null => {
  const candy = candies.find(c => c.id === id);
  if (candy) {
    candy.price = newPrice;
    return candy;
  }
  return null;
};

// Função para remover doce
export const removeCandy = (id: string): boolean => {
  const index = candies.findIndex(c => c.id === id);
  if (index !== -1) {
    candies.splice(index, 1);
    return true;
  }
  return false;
};

// Função para obter doces por categoria
export const getCandiesByCategory = (category: Candy['category']): Candy[] => {
  return candies.filter(candy => candy.category === category && candy.available);
};

// Função para obter doces disponíveis
export const getAvailableCandies = (): Candy[] => {
  return candies.filter(candy => candy.available);
}; 