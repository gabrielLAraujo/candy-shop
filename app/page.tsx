"use client";

import { useState } from "react";
import CandySelector from "@/components/CandySelector";
import { getAvailableIndividualCandies, BoxOption } from "@/data/candies";

export default function Home() {
  const [selectedBox, setSelectedBox] = useState<BoxOption | null>(null);
  const [selectedCandies, setSelectedCandies] = useState<string[]>([]);
  const phoneNumber = "47997010541";

  const availableCandies = getAvailableIndividualCandies();
  const selectedCandiesData = availableCandies.filter((candy) =>
    selectedCandies.includes(candy.id)
  );

  const totalPrice = selectedBox ? selectedBox.price : 0;

  // Função para aplicar máscara de telefone
  const applyPhoneMask = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }
    return value;
  };

  const handleSendWhatsApp = () => {
    if (!selectedBox) {
      alert("Por favor, selecione uma caixa primeiro!");
      return;
    }

    if (selectedCandies.length !== selectedBox.size) {
      alert(
        `Por favor, selecione exatamente ${selectedBox.size} doces para sua caixa!`
      );
      return;
    }

    const message = `🍬 *PEDIDO - ALICE DOCES* 🍭

Olá! Gostaria de fazer um pedido:

*Caixa selecionada:*
📦 ${selectedBox.name} - R$ ${selectedBox.price.toFixed(2)}

*Doces escolhidos:*
${selectedCandiesData
  .map((candy) => `• ${candy.name} - R$ ${candy.price.toFixed(2)}`)
  .join("\n")}

*Resumo:*
📦 Caixa: ${selectedBox.name}
🍬 Quantidade: ${selectedBox.size} doces personalizados
💰 Total: R$ ${totalPrice.toFixed(2)}

*Informações do pedido:*
📱 Número: ${applyPhoneMask(phoneNumber)}
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
            Escolha sua caixa e personalize com seus doces favoritos!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Candy Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🎯 Monte sua Caixa Personalizada
          </h2>
          <CandySelector
            selectedBox={selectedBox}
            selectedCandies={selectedCandies}
            onBoxSelection={setSelectedBox}
            onCandySelection={setSelectedCandies}
          />
        </div>

        {/* Order Summary */}
        {selectedBox && selectedCandies.length > 0 && (
          <div className="mb-12 p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
            <h3 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center justify-between">
              <span>📋 Resumo do Pedido</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                {selectedBox.name}
              </span>
            </h3>

            {/* Box Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-purple-500 mr-3 text-3xl">
                    {selectedBox.emoji}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-800 text-lg">
                      {selectedBox.name}
                    </span>
                    <p className="text-sm text-gray-600">
                      {selectedBox.description}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-purple-600 text-2xl">
                  R$ {selectedBox.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Selected Candies */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                🍬 Doces Selecionados ({selectedCandies.length}/
                {selectedBox.size})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCandiesData.map((candy) => (
                  <div
                    key={candy.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 text-xl">🍬</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          {candy.name}
                        </span>
                        <p className="text-sm text-gray-600">
                          {candy.description}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-pink-600 text-lg">
                      R$ {candy.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-purple-200 pt-6">
              <div className="flex justify-between items-center text-xl font-bold text-purple-800">
                <span>💰 Total do Pedido:</span>
                <span className="text-2xl">R$ {totalPrice.toFixed(2)}</span>
              </div>
              {selectedCandies.length < selectedBox.size && (
                <p className="text-orange-600 text-sm mt-2">
                  ⚠️ Selecione mais {selectedBox.size - selectedCandies.length}{" "}
                  doce(s) para completar sua caixa
                </p>
              )}
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
                📞 Enviar Pedido via WhatsApp
              </label>
              <div className="relative">
                <button
                  onClick={handleSendWhatsApp}
                  disabled={
                    !selectedBox || selectedCandies.length !== selectedBox.size
                  }
                  className="w-full py-4 px-6 text-xl font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">📱</span>
                  Enviar para {applyPhoneMask(phoneNumber)}
                  <span className="text-2xl">💬</span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Clique para enviar o pedido diretamente para o WhatsApp da Alice
                Doces
              </p>
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
                  Escolha o tamanho da caixa (4 ou 12 doces)
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    2
                  </span>
                  Selecione os doces específicos para sua caixa
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    3
                  </span>
                  Clique em &quot;Enviar para {applyPhoneMask(phoneNumber)}
                  &quot;
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
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-600 mt-12">
        <p>🍭 Feito com carinho para Alice Doces 🍭</p>
      </div>
    </div>
  );
}
