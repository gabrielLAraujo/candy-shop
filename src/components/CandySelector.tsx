import React, { useState } from "react";
import Image from "next/image";
import {
  getAvailableIndividualCandies,
  getBoxOptions,
  BoxOption,
} from "@/data/candies";

interface CandySelectorProps {
  selectedBox: BoxOption | null;
  selectedCandies: string[];
  onBoxSelection: (box: BoxOption | null) => void;
  onCandySelection: (candyIds: string[]) => void;
}

export default function CandySelector({
  selectedBox,
  selectedCandies,
  onBoxSelection,
  onCandySelection,
}: CandySelectorProps) {
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [currentStep, setCurrentStep] = useState<"box" | "candies">("box");
  const [videoError, setVideoError] = useState(false);

  const availableCandies = getAvailableIndividualCandies();
  const boxOptions = getBoxOptions();

  const handleBoxClick = (box: BoxOption) => {
    onBoxSelection(box);
    setCurrentStep("candies");
  };

  const handleCandyClick = (candyId: string) => {
    if (!selectedBox) return;

    let newSelection: string[];
    if (selectedCandies.includes(candyId)) {
      newSelection = selectedCandies.filter((id) => id !== candyId);
    } else {
      if (selectedCandies.length >= selectedBox.size) {
        alert(
          `Você pode selecionar no máximo ${selectedBox.size} doces para esta caixa!`
        );
        return;
      }
      newSelection = [...selectedCandies, candyId];
    }
    onCandySelection(newSelection);
  };

  const handleBackToBoxSelection = () => {
    onBoxSelection(null);
    onCandySelection([]);
    setCurrentStep("box");
  };

  const handleVideoError = () => {
    console.error("Erro ao carregar vídeo");
    setVideoError(true);
  };

  const handleSkipVideo = () => {
    setShowIntroVideo(false);
  };

  return (
    <>
      {/* Intro Video Modal */}
      {showIntroVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                🎬 Apresentação da Loja
              </h3>
              <button
                onClick={() => setShowIntroVideo(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {!videoError ? (
              <div className="aspect-video w-full mb-4">
                <video
                  src="/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
                  controls
                  className="w-full h-full rounded-lg"
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  onError={handleVideoError}
                >
                  <source
                    src="/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
                    type="video/mp4"
                  />
                  Seu navegador não suporta vídeos.
                </video>
              </div>
            ) : (
              <div className="aspect-video w-full mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-gray-600 mb-4">Vídeo não disponível</p>
                  <button
                    onClick={handleSkipVideo}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Pular Vídeo
                  </button>
                </div>
              </div>
            )}

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
                        R$ {box.price.toFixed(2)}
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableCandies.map((candy) => {
              const isSelected = selectedCandies.includes(candy.id);
              const isDisabled =
                !isSelected && selectedCandies.length >= selectedBox.size;

              return (
                <div
                  key={candy.id}
                  className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? "ring-4 ring-purple-400 shadow-xl"
                      : isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => !isDisabled && handleCandyClick(candy.id)}
                >
                  {/* Candy Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 hover:border-purple-300 transition-all duration-300">
                    <div className="aspect-square relative">
                      <Image
                        src={candy.imageUrl}
                        alt={candy.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                          ✓
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
