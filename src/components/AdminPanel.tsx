"use client";

import { useState } from "react";
import {
  Candy,
  candies,
  addCandy,
  updateCandyPrice,
  removeCandy,
} from "@/data/candies";

export default function AdminPanel() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCandy, setEditingCandy] = useState<Candy | null>(null);
  const [newCandy, setNewCandy] = useState({
    name: "",
    emoji: "",
    color: "from-pink-400 to-purple-500",
    price: 0,
    description: "",
    category: "chocolate" as Candy["category"],
    available: true,
    imageUrl: "",
    videoUrl: "",
  });

  const handleAddCandy = () => {
    if (newCandy.name && newCandy.emoji && newCandy.price > 0) {
      addCandy(newCandy);
      setNewCandy({
        name: "",
        emoji: "",
        color: "from-pink-400 to-purple-500",
        price: 0,
        description: "",
        category: "chocolate",
        available: true,
        imageUrl: "",
        videoUrl: "",
      });
      setShowAddForm(false);
    }
  };

  const handleUpdatePrice = (id: string, newPrice: number) => {
    updateCandyPrice(id, newPrice);
    setEditingCandy(null);
  };

  const handleRemoveCandy = (id: string) => {
    if (confirm("Tem certeza que deseja remover este doce?")) {
      removeCandy(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          🍬 Painel Administrativo - Alice Doces
        </h2>

        {/* Add New Candy */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            {showAddForm ? "❌ Cancelar" : "➕ Adicionar Novo Doce"}
          </button>

          {showAddForm && (
            <div className="mt-4 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Novo Doce</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome do doce"
                  value={newCandy.name}
                  onChange={(e) =>
                    setNewCandy({ ...newCandy, name: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Emoji (ex: 🍫)"
                  value={newCandy.emoji}
                  onChange={(e) =>
                    setNewCandy({ ...newCandy, emoji: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg"
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
                  className="px-4 py-2 border rounded-lg"
                />
                <select
                  value={newCandy.category}
                  onChange={(e) =>
                    setNewCandy({
                      ...newCandy,
                      category: e.target.value as Candy["category"],
                    })
                  }
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="chocolate">Chocolate</option>
                  <option value="gummy">Goma</option>
                  <option value="hard">Duro</option>
                  <option value="soft">Macio</option>
                  <option value="special">Especial</option>
                </select>
                <input
                  type="text"
                  placeholder="URL da imagem (ex: https://example.com/image.jpg)"
                  value={newCandy.imageUrl}
                  onChange={(e) =>
                    setNewCandy({ ...newCandy, imageUrl: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="URL do vídeo (YouTube) ou caminho local (/video.mp4)"
                  value={newCandy.videoUrl}
                  onChange={(e) =>
                    setNewCandy({ ...newCandy, videoUrl: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg md:col-span-2"
                />
                <textarea
                  placeholder="Descrição"
                  value={newCandy.description}
                  onChange={(e) =>
                    setNewCandy({ ...newCandy, description: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg md:col-span-2"
                  rows={3}
                />
                <div className="flex items-center md:col-span-2">
                  <input
                    type="checkbox"
                    checked={newCandy.available}
                    onChange={(e) =>
                      setNewCandy({ ...newCandy, available: e.target.checked })
                    }
                    className="mr-2"
                  />
                  <label>Disponível</label>
                </div>
              </div>
              <button
                onClick={handleAddCandy}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
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
                <th className="p-3 text-left">Doce</th>
                <th className="p-3 text-left">Preço</th>
                <th className="p-3 text-left">Categoria</th>
                <th className="p-3 text-left">Imagem</th>
                <th className="p-3 text-left">Vídeo</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {candies.map((candy) => (
                <tr key={candy.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{candy.emoji}</span>
                      <div>
                        <div className="font-semibold">{candy.name}</div>
                        <div className="text-sm text-gray-500">
                          {candy.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    {editingCandy?.id === candy.id ? (
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={editingCandy.price}
                          onChange={(e) =>
                            setEditingCandy({
                              ...editingCandy,
                              price: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-20 px-2 py-1 border rounded"
                        />
                        <button
                          onClick={() =>
                            handleUpdatePrice(candy.id, editingCandy.price)
                          }
                          className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => setEditingCandy(null)}
                          className="ml-1 bg-gray-500 text-white px-2 py-1 rounded text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="font-semibold">
                          R$ {candy.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => setEditingCandy(candy)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          ✏️
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {candy.category}
                    </span>
                  </td>
                  <td className="p-3">
                    {candy.imageUrl ? (
                      <a
                        href={candy.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        🖼️ Ver Imagem
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">Sem imagem</span>
                    )}
                  </td>
                  <td className="p-3">
                    {candy.videoUrl ? (
                      <a
                        href={candy.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        🎥 Ver Vídeo
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">Sem vídeo</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        candy.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {candy.available ? "Disponível" : "Indisponível"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRemoveCandy(candy.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️ Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
