export interface Candy {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface IndividualCandy {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface BoxOption {
  id: string;
  name: string;
  size: number;
  price: number;
  description: string;
  emoji: string;
}

// Opções de caixa disponíveis
export const boxOptions: BoxOption[] = [
  {
    id: "caixa-4",
    name: "Caixa com 4 Doces",
    size: 4,
    price: 10.00,
    description: "Caixa personalizada com 4 doces da sua escolha",
    emoji: "📦"
  },
  {
    id: "caixa-12",
    name: "Caixa com 12 Doces",
    size: 12,
    price: 25.00,
    description: "Caixa personalizada com 12 doces da sua escolha",
    emoji: "🎁"
  }
];

// Doces individuais disponíveis para seleção
export const individualCandies: IndividualCandy[] = [
  {
    id: "doce-1",
    name: "Brigadeiro Gourmet",
    price: 6.50,
    description: "Brigadeiro artesanal com chocolate belga",
    imageUrl: "/images/WhatsApp Image 2025-07-10 at 19.44.02 (3).jpeg"
  },
  {
    id: "doce-2",
    name: "Beijinho Especial",
    price: 6.50,
    description: "Beijinho com coco ralado e leite condensado",
    imageUrl: "/images/WhatsApp Image 2025-07-10 at 19.44.02 (2).jpeg"
  },
  {
    id: "doce-3",
    name: "Cajuzinho Premium",
    price: 6.50,
    description: "Cajuzinho com amendoim torrado",
    imageUrl: "/images/WhatsApp Image 2025-07-10 at 19.44.02 (1).jpeg"
  },
  {
    id: "doce-4",
    name: "Bem Casado",
    price: 6.50,
    description: "Bem casado com recheio cremoso",
    imageUrl: "/images/WhatsApp Image 2025-07-10 at 19.44.02.jpeg"
  },
  {
    id: "doce-5",
    name: "Quindim",
    price: 6.50,
    description: "Quindim tradicional da Bahia",
    imageUrl: "/images/WhatsApp Image 2025-07-10 at 19.44.01 (3).jpeg"
  },
  {
    id: "doce-6",
    name: "Pudim de Leite",
    price: 6.50,
    description: "Pudim de leite condensado com calda",
    imageUrl: "/images/WhatsApp Image 2025-07-10 at 19.44.01 (2).jpeg"
  },
  {
    id: "doce-7",
    name: "Trufa de Chocolate",
    price: 6.50,
    description: "Trufa artesanal com chocolate 70%",
    imageUrl: "/images/WhatsApp Image 2025-07-10 at 19.44.01 (1).jpeg"
  },
  {
    id: "doce-8",
    name: "Bombom de Morango",
    price: 6.50,
    description: "Bombom recheado com morango",
    imageUrl: "/images/WhatsApp Image 2025-07-10 at 19.44.01.jpeg"
  },
  {
    id: "doce-9",
    name: "Palha Italiana",
    price: 6.50,
    description: "Palha italiana com chocolate e biscoito",
    imageUrl: "/images/WhatsApp Image 2025-07-10 at 19.44.00.jpeg"
  }
];

// Função para obter doces individuais disponíveis
export const getAvailableIndividualCandies = (): IndividualCandy[] => {
  return individualCandies;
};

// Função para obter opções de caixa
export const getBoxOptions = (): BoxOption[] => {
  return boxOptions;
};

// Função para adicionar novo doce individual
export const addIndividualCandy = (newCandy: Omit<IndividualCandy, 'id'>): IndividualCandy => {
  const id = `${newCandy.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
  const candy: IndividualCandy = { ...newCandy, id };
  individualCandies.push(candy);
  return candy;
};

// Função para atualizar preço de doce individual
export const updateIndividualCandyPrice = (id: string, newPrice: number): IndividualCandy | null => {
  const candy = individualCandies.find(c => c.id === id);
  if (candy) {
    candy.price = newPrice;
    return candy;
  }
  return null;
};

// Função para remover doce individual
export const removeIndividualCandy = (id: string): boolean => {
  const index = individualCandies.findIndex(c => c.id === id);
  if (index !== -1) {
    individualCandies.splice(index, 1);
    return true;
  }
  return false;
}; 