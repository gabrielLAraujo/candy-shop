import React, { useState } from "react";

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

interface CandySelectorProps {
  selectedBox: BoxOption | null;
  selectedCandies: string[];
  onBoxSelection: (box: BoxOption | null) => void;
  onCandySelection: (candyIds: string[]) => void;
  availableCandies: Candy[];
}

export default function CandySelector({
  selectedBox,
  selectedCandies,
  onBoxSelection,
  onCandySelection,
  availableCandies,
}: CandySelectorProps) {
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [currentStep, setCurrentStep] = useState<"box" | "candies">("box");

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

  const handleBoxClick = (box: BoxOption) => {
    onBoxSelection(box);
    setCurrentStep("candies");
  };

  const handleBackToBoxSelection = () => {
    onBoxSelection(null);
    onCandySelection([]);
    setCurrentStep("box");
  };

  return (
    <>
      {/* Intro Welcome Modal */}
      {showIntroVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                🍬 Alice Doces
              </h3>
              <button
                onClick={() => setShowIntroVideo(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🍬</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Alice Doces
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Bem-vindo à nossa loja de doces artesanais! Escolha sua caixa
                  personalizada e monte com seus doces favoritos.
                </p>
                <div className="bg-white/80 rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      🎯 Como Funciona
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>1. Escolha o tamanho da caixa (4 ou 12 doces)</div>
                      <div>2. Selecione seus doces favoritos</div>
                      <div>3. Envie direto para o WhatsApp</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowIntroVideo(false)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Começar a Escolher 🍭
                </button>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowIntroVideo(false)}
                className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                🍬 Ver Opções
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Box Selection */}
      {currentStep === "box" && (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              📦 Escolha o Tamanho da Caixa
            </h2>
            <p className="text-gray-600 text-lg">
              Selecione quantos doces você quer na sua caixa personalizada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {boxOptions.map((box) => (
              <div
                key={box.id}
                className="group relative cursor-pointer transition-all duration-300 transform hover:scale-105"
                onClick={() => handleBoxClick(box)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300">
                  <div className="p-8 text-center">
                    <div className="text-6xl mb-4">{box.emoji}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {box.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{box.description}</p>
                    <div className="bg-white/80 rounded-xl p-4 mb-4">
                      <div className="text-3xl font-bold text-purple-600">
                        R$ {(box.size * 2.5).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {box.size} doces personalizados
                      </div>
                    </div>
                    <div className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                      Escolher Esta Caixa
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Candy Selection */}
      {currentStep === "candies" && selectedBox && (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <button
              onClick={handleBackToBoxSelection}
              className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Voltar para seleção de caixa
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🍬 Escolha seus {selectedBox.size} Doces
            </h2>
            <p className="text-gray-600 text-lg">
              Selecione {selectedBox.size} doces para sua caixa de{" "}
              {selectedBox.name}
            </p>
            <div className="bg-purple-100 rounded-xl p-4 mt-4 inline-block">
              <span className="text-purple-800 font-semibold">
                {selectedCandies.length} de {selectedBox.size} doces
                selecionados
              </span>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 mt-4 max-w-2xl mx-auto">
              <p className="text-blue-800 text-sm">
                💡 <strong>Dica:</strong> Use os botões &quot;+&quot; e
                &quot;−&quot; no topo das imagens para adicionar ou remover
                doces. O número roxo mostra quantas unidades você selecionou.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableCandies.map((candy) => {
              const isSelected = selectedCandies.includes(candy.id);
              const candyCount = selectedCandies.filter(
                (id) => id === candy.id
              ).length;
              const canAdd = selectedCandies.length < selectedBox.size;
              const canRemove = isSelected;

              return (
                <div
                  key={candy.id}
                  className={`group relative transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? "ring-4 ring-purple-400 shadow-xl"
                      : !canAdd
                      ? "opacity-50"
                      : "hover:shadow-lg"
                  }`}
                >
                  {/* Candy Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 hover:border-purple-300 transition-all duration-300">
                    <div className="aspect-square relative">
                      {candy.image ? (
                        <img
                          src={candy.image}
                          alt={candy.name}
                          className="object-cover w-full h-full rounded-2xl"
                          style={{ aspectRatio: 1 }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                          <span className="text-4xl">🍬</span>
                        </div>
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Control Buttons */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        {/* Remove Button */}
                        {canRemove && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const index = selectedCandies.indexOf(candy.id);
                              if (index !== -1) {
                                const newSelection = [
                                  ...selectedCandies.slice(0, index),
                                  ...selectedCandies.slice(index + 1),
                                ];
                                onCandySelection(newSelection);
                              }
                            }}
                            className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg hover:bg-red-600 transition-colors"
                          >
                            −
                          </button>
                        )}

                        {/* Add Button */}
                        {selectedCandies.length < selectedBox.size && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (selectedCandies.length < selectedBox.size) {
                                const newSelection = [
                                  ...selectedCandies,
                                  candy.id,
                                ];
                                onCandySelection(newSelection);
                              }
                            }}
                            className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg hover:bg-green-600 transition-colors"
                          >
                            +
                          </button>
                        )}
                      </div>

                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute top-2 left-2 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                          {candyCount}
                        </div>
                      )}
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg drop-shadow-lg">
                            {candy.name}
                          </h3>
                          <p className="text-sm opacity-90">
                            {candy.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="bg-white/20 rounded-lg p-2 mb-3">
                            <span className="text-white font-bold text-lg">
                              R$ {candy.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
