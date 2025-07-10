"use client";

import { useState } from "react";
import CandySelector from "@/components/CandySelector";
import { getAvailableCandies } from "@/data/candies";

export default function Home() {
  const [selectedCandies, setSelectedCandies] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const availableCandies = getAvailableCandies();
  const selectedCandiesData = availableCandies.filter((candy) =>
    selectedCandies.includes(candy.id)
  );
  const totalPrice = selectedCandiesData.reduce(
    (sum, candy) => sum + candy.price,
    0
  );

  const handleSendWhatsApp = () => {
    if (selectedCandies.length === 0) {
      alert("Por favor, selecione pelo menos um doce!");
      return;
    }

    if (!phoneNumber) {
      alert("Por favor, insira um número de telefone!");
      return;
    }

    const message = `🍬 *PEDIDO - ALICE DOCES* 🍭

Olá! Gostaria de fazer um pedido:

*Doces selecionados:*
${selectedCandiesData
  .map((candy) => `• ${candy.name} - R$ ${candy.price.toFixed(2)}`)
  .join("\n")}

*Resumo:*
📦 Quantidade: ${selectedCandiesData.length} item${
      selectedCandiesData.length > 1 ? "s" : ""
    }
💰 Total: R$ ${totalPrice.toFixed(2)}

*Informações do pedido:*
📱 Número: ${phoneNumber}
📅 Data: ${new Date().toLocaleDateString("pt-BR")}
⏰ Hora: ${new Date().toLocaleTimeString("pt-BR")}

Obrigado! 🍬✨`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            🍬 Alice Doces 🍭
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Selecione seus doces favoritos e envie direto pelo WhatsApp!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Candy Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🎯 Doces da Alice
          </h2>
          <CandySelector
            selectedCandies={selectedCandies}
            onSelectionChange={setSelectedCandies}
          />
        </div>

        {/* Order Summary */}
        {selectedCandies.length > 0 && (
          <div className="mb-12 p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
            <h3 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center justify-between">
              <span>📋 Resumo do Pedido</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                {selectedCandies.length} item
                {selectedCandies.length > 1 ? "s" : ""}
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {selectedCandiesData.map((candy) => (
                <div
                  key={candy.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                >
                  <div className="flex items-center">
                    <span className="text-pink-500 mr-3 text-2xl">
                      {candy.emoji}
                    </span>
                    <div>
                      <span className="font-semibold text-gray-800">
                        {candy.name}
                      </span>
                      <p className="text-sm text-gray-600">
                        {candy.description}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-purple-600 text-lg">
                    R$ {candy.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-purple-200 pt-6">
              <div className="flex justify-between items-center text-xl font-bold text-purple-800">
                <span>💰 Total do Pedido:</span>
                <span className="text-2xl">R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📱 Enviar Pedido
          </h3>

          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                📞 Número do WhatsApp
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Ex: 5511999999999"
                  className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200 bg-white text-gray-800"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📞
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Digite apenas números, sem espaços ou caracteres especiais
              </p>
            </div>

            <button
              onClick={handleSendWhatsApp}
              disabled={selectedCandies.length === 0 || !phoneNumber}
              className="w-full py-4 px-6 text-xl font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <span className="text-2xl">📱</span>
              Enviar via WhatsApp
              <span className="text-2xl">💬</span>
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3 text-lg">
              💡 Como funciona:
            </h4>
            <ol className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  1
                </span>
                Selecione os doces que deseja clicando nas imagens
              </li>
              <li className="flex items-start">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  2
                </span>
                Digite o número do WhatsApp no campo acima
              </li>
              <li className="flex items-start">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  3
                </span>
                Clique em &quot;Enviar via WhatsApp&quot;
              </li>
              <li className="flex items-start">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  4
                </span>
                Uma mensagem será aberta automaticamente com seu pedido
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-600 mt-12">
        <p>🍭 Feito com carinho para Alice Doces 🍭</p>
      </div>
    </div>
  );
}
