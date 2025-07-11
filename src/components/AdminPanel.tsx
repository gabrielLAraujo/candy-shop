"use client";

import { useState } from "react";
import {
  IndividualCandy,
  individualCandies,
  addIndividualCandy,
  updateIndividualCandyPrice,
  removeIndividualCandy,
  boxOptions,
} from "@/data/candies";

export default function AdminPanel() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCandy, setEditingCandy] = useState<IndividualCandy | null>(
    null
  );
  const [newCandy, setNewCandy] = useState({
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
  });

  const handleAddCandy = () => {
    if (newCandy.name && newCandy.price > 0) {
      addIndividualCandy(newCandy);
      setNewCandy({
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
      });
      setShowAddForm(false);
    }
  };

  const handleUpdatePrice = (id: string, newPrice: number) => {
    updateIndividualCandyPrice(id, newPrice);
    setEditingCandy(null);
  };

  const handleRemoveCandy = (id: string) => {
    if (confirm("Tem certeza que deseja remover este doce?")) {
      removeIndividualCandy(id);
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
                <textarea
                  placeholder="Descrição"
                  value={newCandy.description}
                  onChange={(e) =>
                    setNewCandy({ ...newCandy, description: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg md:col-span-2"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="URL da imagem (ex: /images/doce.jpg)"
                  value={newCandy.imageUrl}
                  onChange={(e) =>
                    setNewCandy({ ...newCandy, imageUrl: e.target.value })
                  }
                  className="px-4 py-2 border rounded-lg md:col-span-2"
                />
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
                <th className="p-3 text-left">Descrição</th>
                <th className="p-3 text-left">Imagem</th>
                <th className="p-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {individualCandies.map((candy) => (
                <tr key={candy.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-semibold text-lg">{candy.name}</div>
                  </td>
                  <td className="p-3">
                    {editingCandy?.id === candy.id ? (
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
                    ) : (
                      <span className="font-semibold">
                        R$ {candy.price.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-gray-600 max-w-xs">
                      {candy.description}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                      {candy.imageUrl && (
                        <img
                          src={candy.imageUrl}
                          alt={candy.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      {editingCandy?.id === candy.id ? (
                        <>
                          <button
                            onClick={() =>
                              handleUpdatePrice(candy.id, editingCandy.price)
                            }
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={() => setEditingCandy(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingCandy(candy)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleRemoveCandy(candy.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
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
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            📦 Opções de Caixa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {boxOptions.map((box) => (
              <div key={box.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl mb-2">{box.emoji}</div>
                    <h4 className="font-semibold text-lg">{box.name}</h4>
                    <p className="text-gray-600">{box.description}</p>
                    <p className="text-sm text-gray-500">
                      {box.size} doces - R$ {box.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
