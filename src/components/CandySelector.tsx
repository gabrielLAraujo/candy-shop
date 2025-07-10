import React, { useState } from "react";
import Image from "next/image";
import { getAvailableCandies } from "@/data/candies";

interface CandySelectorProps {
  selectedCandies: string[];
  onSelectionChange: (selected: string[]) => void;
}

export default function CandySelector({
  selectedCandies,
  onSelectionChange,
}: CandySelectorProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const availableCandies = getAvailableCandies();

  const handleCandyClick = (candyId: string) => {
    if (selectedCandies.includes(candyId)) {
      onSelectionChange(selectedCandies.filter((id) => id !== candyId));
    } else {
      onSelectionChange([...selectedCandies, candyId]);
    }
  };

  const openVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const isLocalVideo = (url: string) => {
    return (
      url.startsWith("/") ||
      url.endsWith(".mp4") ||
      url.endsWith(".webm") ||
      url.endsWith(".mov")
    );
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
            <div className="aspect-video w-full mb-4">
              <video
                src="/WhatsApp Video 2025-07-09 at 15.01.28.mp4"
                controls
                className="w-full h-full rounded-lg"
                autoPlay
              >
                Seu navegador não suporta vídeos.
              </video>
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowIntroVideo(false)}
                className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                🍬 Ver Doces
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candy Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {availableCandies.map((candy) => {
          const isSelected = selectedCandies.includes(candy.id);
          return (
            <div
              key={candy.id}
              className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? "ring-4 ring-purple-400 shadow-xl"
                  : "hover:shadow-lg"
              }`}
              onClick={() => handleCandyClick(candy.id)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
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
                      <p className="text-sm opacity-90">{candy.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        R$ {candy.price.toFixed(2)}
                      </div>
                      <div className="text-3xl">{candy.emoji}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {candy.videoUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openVideo(candy.videoUrl!);
                    }}
                    className="bg-white/90 hover:bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-medium shadow-lg"
                  >
                    🎥 Vídeo
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">🎥 Demonstração do Doce</h3>
              <button
                onClick={closeVideo}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full">
              {isLocalVideo(selectedVideo) ? (
                <video
                  src={selectedVideo}
                  controls
                  className="w-full h-full rounded-lg"
                  autoPlay
                >
                  Seu navegador não suporta vídeos.
                </video>
              ) : (
                <iframe
                  src={selectedVideo.replace("watch?v=", "embed/")}
                  title="Demonstração do Doce"
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
