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
  weight: number; // gramatura em gramas
}

export default function AdminPanel() {
  const [candies, setCandies] = useState<Candy[]>([]);
  const [boxes, setBoxes] = useState<BoxOption[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBoxForm, setShowBoxForm] = useState(false);
  const [showBoxEditModal, setShowBoxEditModal] = useState(false);
  const [editingCandy, setEditingCandy] = useState<Candy | null>(null);
  const [editingBox, setEditingBox] = useState<BoxOption | null>(null);
  const [newCandy, setNewCandy] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  const [newBox, setNewBox] = useState({
    name: "",
    size: 0,
    price: 0,
    description: "",
    emoji: "",
    weight: 0,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchCandies();
    fetchBoxes();
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchCandies = async () => {
    try {
      const response = await fetch("/api/candies");
      const data = await response.json();
      setCandies(data);
    } catch (error) {
      console.error("Erro ao carregar doces:", error);
      showMessage("error", "Erro ao carregar doces");
    } finally {
      setLoading(false);
    }
  };

  const fetchBoxes = async () => {
    try {
      const response = await fetch("/api/boxes");
      const data = await response.json();
      setBoxes(data);
    } catch (error) {
      console.error("Erro ao carregar caixas:", error);
      showMessage("error", "Erro ao carregar caixas");
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit && editingCandy) {
        setEditingCandy({ ...editingCandy, image: reader.result as string });
      } else {
        setNewCandy((prev) => ({ ...prev, image: reader.result as string }));
      }
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
          showMessage("success", "Doce adicionado com sucesso!");
        } else {
          showMessage("error", "Erro ao adicionar doce");
        }
      } catch (error) {
        console.error("Erro ao adicionar doce:", error);
        showMessage("error", "Erro ao adicionar doce");
      }
    }
  };

  const handleEditCandy = (candy: Candy) => {
    setEditingCandy(candy);
    setShowEditModal(true);
  };

  const handleUpdateCandy = async () => {
    if (!editingCandy || !editingCandy.name || editingCandy.price <= 0) return;

    try {
      const response = await fetch(`/api/candies/${editingCandy.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingCandy),
      });

      if (response.ok) {
        await fetchCandies();
        setShowEditModal(false);
        setEditingCandy(null);
        showMessage("success", "Doce atualizado com sucesso!");
      } else {
        showMessage("error", "Erro ao atualizar doce");
      }
    } catch (error) {
      console.error("Erro ao atualizar doce:", error);
      showMessage("error", "Erro ao atualizar doce");
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
          showMessage("success", "Doce removido com sucesso!");
        } else {
          showMessage("error", "Erro ao remover doce");
        }
      } catch (error) {
        console.error("Erro ao remover doce:", error);
        showMessage("error", "Erro ao remover doce");
      }
    }
  };

  const handleAddBox = async () => {
    if (newBox.name && newBox.size > 0 && newBox.price > 0) {
      try {
        const response = await fetch("/api/boxes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBox),
        });

        if (response.ok) {
          await fetchBoxes();
          setNewBox({
            name: "",
            size: 0,
            price: 0,
            description: "",
            emoji: "",
            weight: 0,
          });
          setShowBoxForm(false);
          showMessage("success", "Caixa adicionada com sucesso!");
        } else {
          showMessage("error", "Erro ao adicionar caixa");
        }
      } catch (error) {
        console.error("Erro ao adicionar caixa:", error);
        showMessage("error", "Erro ao adicionar caixa");
      }
    }
  };

  const handleEditBox = (box: BoxOption) => {
    setEditingBox(box);
    setShowBoxEditModal(true);
  };

  const handleUpdateBox = async () => {
    if (
      !editingBox ||
      !editingBox.name ||
      editingBox.size <= 0 ||
      editingBox.price <= 0
    )
      return;

    try {
      const response = await fetch(`/api/boxes/${editingBox.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingBox),
      });

      if (response.ok) {
        await fetchBoxes();
        setShowBoxEditModal(false);
        setEditingBox(null);
        showMessage("success", "Caixa atualizada com sucesso!");
      } else {
        showMessage("error", "Erro ao atualizar caixa");
      }
    } catch (error) {
      console.error("Erro ao atualizar caixa:", error);
      showMessage("error", "Erro ao atualizar caixa");
    }
  };

  const handleRemoveBox = async (id: string) => {
    if (confirm("Tem certeza que deseja remover esta caixa?")) {
      try {
        const response = await fetch(`/api/boxes/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await fetchBoxes();
          showMessage("success", "Caixa removida com sucesso!");
        } else {
          showMessage("error", "Erro ao remover caixa");
        }
      } catch (error) {
        console.error("Erro ao remover caixa:", error);
        showMessage("error", "Erro ao remover caixa");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Message Toast */}
      {message && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

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
                type="text"
                placeholder="Preço"
                value={newCandy.price === 0 ? "" : newCandy.price}
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
                onChange={(e) => handleImageUpload(e, false)}
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
                    <button
                      onClick={() => handleEditCandy(candy)}
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingCandy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-black mb-4">
              Editar Doce
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome do doce"
                value={editingCandy.name}
                onChange={(e) =>
                  setEditingCandy({ ...editingCandy, name: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Preço"
                value={editingCandy.price === 0 ? "" : editingCandy.price}
                onChange={(e) =>
                  setEditingCandy({
                    ...editingCandy,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <textarea
                placeholder="Descrição"
                value={editingCandy.description}
                onChange={(e) =>
                  setEditingCandy({
                    ...editingCandy,
                    description: e.target.value,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 md:col-span-2"
                rows={3}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 md:col-span-2"
              />
              {editingCandy.image && (
                <img
                  src={editingCandy.image}
                  alt="Pré-visualização"
                  className="rounded-lg max-h-32 object-contain border border-gray-200 md:col-span-2"
                />
              )}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleUpdateCandy}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed"
                disabled={!editingCandy.name || editingCandy.price <= 0}
              >
                Salvar
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCandy(null);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Box Options */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-black">📦 Opções de Caixa</h3>
          <button
            onClick={() => setShowBoxForm(!showBoxForm)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
          >
            {showBoxForm ? "❌ Cancelar" : "➕ Adicionar Caixa"}
          </button>
        </div>

        {showBoxForm && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-semibold text-black mb-4">
              Nova Caixa
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome da caixa (ex: Caixa com 4 Doces)"
                value={newBox.name}
                onChange={(e) => setNewBox({ ...newBox, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
              <input
                type="text"
                placeholder="Quantidade de doces (ex: 4, 8, 12, 50, 100)"
                value={newBox.size === 0 ? "" : newBox.size}
                onChange={(e) =>
                  setNewBox({
                    ...newBox,
                    size: parseInt(e.target.value) || 0,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
              <input
                type="text"
                placeholder="Preço (ex: 10.00)"
                value={newBox.price === 0 ? "" : newBox.price}
                onChange={(e) =>
                  setNewBox({
                    ...newBox,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
              <input
                type="text"
                placeholder="Peso em gramas (ex: 200)"
                value={newBox.weight === 0 ? "" : newBox.weight}
                onChange={(e) =>
                  setNewBox({
                    ...newBox,
                    weight: parseFloat(e.target.value) || 0,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
              <input
                type="text"
                placeholder="Emoji (ex: 📦, 🎁, 🍬)"
                value={newBox.emoji}
                onChange={(e) =>
                  setNewBox({ ...newBox, emoji: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              />
              <textarea
                placeholder="Descrição da caixa (ex: Caixa personalizada com 4 doces da sua escolha)"
                value={newBox.description}
                onChange={(e) =>
                  setNewBox({ ...newBox, description: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white md:col-span-2"
                rows={3}
              />
            </div>
            <button
              onClick={handleAddBox}
              className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed"
              disabled={!newBox.name || newBox.size <= 0 || newBox.price <= 0}
            >
              Adicionar Caixa
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boxes.map((box) => (
            <div
              key={box.id}
              className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-2xl mb-2">{box.emoji}</div>
                  <h4 className="font-semibold text-lg text-black">
                    {box.name}
                  </h4>
                  <p className="text-black text-sm mb-2">{box.description}</p>
                  <p className="text-sm text-black">
                    {box.size} doces - R$ {box.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600">Peso: {box.weight}g</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => handleEditBox(box)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleRemoveBox(box.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Box Modal */}
      {showBoxEditModal && editingBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-black mb-4">
              Editar Caixa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome da caixa"
                value={editingBox.name}
                onChange={(e) =>
                  setEditingBox({ ...editingBox, name: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Quantidade de doces"
                value={editingBox.size === 0 ? "" : editingBox.size}
                onChange={(e) =>
                  setEditingBox({
                    ...editingBox,
                    size: parseInt(e.target.value) || 0,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Preço"
                value={editingBox.price === 0 ? "" : editingBox.price}
                onChange={(e) =>
                  setEditingBox({
                    ...editingBox,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Peso em gramas"
                value={editingBox.weight === 0 ? "" : editingBox.weight}
                onChange={(e) =>
                  setEditingBox({
                    ...editingBox,
                    weight: parseFloat(e.target.value) || 0,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Emoji"
                value={editingBox.emoji}
                onChange={(e) =>
                  setEditingBox({ ...editingBox, emoji: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <textarea
                placeholder="Descrição da caixa"
                value={editingBox.description}
                onChange={(e) =>
                  setEditingBox({
                    ...editingBox,
                    description: e.target.value,
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 md:col-span-2"
                rows={3}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleUpdateBox}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed"
                disabled={
                  !editingBox.name ||
                  editingBox.size <= 0 ||
                  editingBox.price <= 0
                }
              >
                Salvar
              </button>
              <button
                onClick={() => {
                  setShowBoxEditModal(false);
                  setEditingBox(null);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
