"use client";

import { useState, useEffect } from "react";

interface Candy {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string | null;
}

interface BoxOption {
  id: string;
  name: string;
  size: number;
  price: number;
  description: string;
  emoji: string;
}

export default function AdminPanel() {
  const [candies, setCandies] = useState<Candy[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCandy, setEditingCandy] = useState<Candy | null>(null);
  const [newCandy, setNewCandy] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandies();
  }, []);

  const fetchCandies = async () => {
    try {
      const response = await fetch("/api/candies");
      const data = await response.json();
      setCandies(data);
    } catch (error) {
      console.error("Erro ao carregar doces:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para converter imagem em base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewCandy((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddCandy = async () => {
    if (newCandy.name && newCandy.price > 0) {
      try {
        const response = await fetch("/api/candies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCandy),
        });

        if (response.ok) {
          await fetchCandies();
          setNewCandy({
            name: "",
            price: 0,
            description: "",
            image: "",
          });
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Erro ao adicionar doce:", error);
      }
    }
  };

  const handleUpdatePrice = async (id: string, newPrice: number) => {
    if (!editingCandy) return;

    try {
      const response = await fetch(`/api/candies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: newPrice }),
      });

      if (response.ok) {
        await fetchCandies();
        setEditingCandy(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar preço:", error);
    }
  };

  const handleRemoveCandy = async (id: string) => {
    if (confirm("Tem certeza que deseja remover este doce?")) {
      try {
        const response = await fetch(`/api/candies/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await fetchCandies();
        }
      } catch (error) {
        console.error("Erro ao remover doce:", error);
      }
    }
  };

  const boxOptions: BoxOption[] = [
    {
      id: "caixa-4",
      name: "Caixa com 4 Doces",
      size: 4,
      price: 10.0,
      description: "Caixa personalizada com 4 doces da sua escolha",
      emoji: "📦",
    },
    {
      id: "caixa-12",
      name: "Caixa com 12 Doces",
      size: 12,
      price: 30.0,
      description: "Caixa personalizada com 12 doces da sua escolha",
      emoji: "🎁",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Add New Candy */}
      <div className="mb-8">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed"
          disabled={loading}
        >
          {showAddForm ? "❌ Cancelar" : "➕ Adicionar Novo Doce"}
        </button>

        {showAddForm && (
          <div className="mt-4 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-black mb-4">Novo Doce</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome do doce"
                value={newCandy.name}
                onChange={(e) =>
                  setNewCandy({ ...newCandy, name: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:text-black"
                disabled={loading}
              />
              <input
                type="number"
                placeholder="Preço"
                value={newCandy.price}
                onChange={(e) =>
                  setNewCandy({
                    ...newCandy,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:text-black"
                disabled={loading}
              />
              <textarea
                placeholder="Descrição"
                value={newCandy.description}
                onChange={(e) =>
                  setNewCandy({ ...newCandy, description: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:text-black md:col-span-2"
                rows={3}
                disabled={loading}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:text-black md:col-span-2"
                disabled={loading}
              />
              {newCandy.image && (
                <img
                  src={newCandy.image}
                  alt="Pré-visualização"
                  className="rounded-lg max-h-32 object-contain border border-gray-200 md:col-span-2"
                />
              )}
            </div>
            <button
              onClick={handleAddCandy}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed"
              disabled={loading || !newCandy.name || newCandy.price <= 0}
            >
              Adicionar Doce
            </button>
          </div>
        )}
      </div>

      {/* Candy List */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left text-black font-semibold">Doce</th>
              <th className="p-4 text-left text-black font-semibold">Preço</th>
              <th className="p-4 text-left text-black font-semibold">
                Descrição
              </th>
              <th className="p-4 text-left text-black font-semibold">Imagem</th>
              <th className="p-4 text-left text-black font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {candies.map((candy) => (
              <tr key={candy.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-black">{candy.name}</td>
                <td className="p-4 text-black">R$ {candy.price.toFixed(2)}</td>
                <td className="p-4 text-black">{candy.description}</td>
                <td className="p-4">
                  {candy.image ? (
                    <img
                      src={candy.image}
                      alt={candy.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                  ) : (
                    <span className="text-gray-600">Sem imagem</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    {editingCandy?.id === candy.id ? (
                      <>
                        <input
                          type="number"
                          value={editingCandy.price}
                          onChange={(e) =>
                            setEditingCandy({
                              ...editingCandy,
                              price: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <button
                          onClick={() =>
                            handleUpdatePrice(candy.id, editingCandy.price)
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => setEditingCandy(null)}
                          className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingCandy(candy)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleRemoveCandy(candy.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                        >
                          Remover
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Box Options */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-black mb-4">
          📦 Opções de Caixa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {boxOptions.map((box) => (
            <div key={box.id} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl mb-2">{box.emoji}</div>
                  <h4 className="font-semibold text-lg text-black">
                    {box.name}
                  </h4>
                  <p className="text-black">{box.description}</p>
                  <p className="text-sm text-black">
                    {box.size} doces - R$ {box.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
