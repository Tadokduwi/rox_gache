"use client";

import { useState } from "react";

const openSound =
  typeof Audio !== "undefined" ? new Audio("/sounds/open.mp3") : null;
const legendarySound =
  typeof Audio !== "undefined" ? new Audio("/sounds/legendary.mp3") : null;
import Image from "next/image";

// ===== ตัวละคร =====
const characterGacha = [
  {
    name: "Normal",
    chance: 61.84,
    images: 14,
    path: "/images/normal",
    color: "text-white",
  },
  {
    name: "Uncommon",
    chance: 13.25,
    images: 8,
    path: "/images/uncommon",
    color: "text-green-400",
  },
  {
    name: "Common",
    chance: 14.05,
    images: 6,
    path: "/images/common",
    color: "text-blue-400",
  },
  {
    name: "Rare",
    chance: 2.61,
    images: 8,
    path: "/images/rare",
    color: "text-purple-400",
  },
  {
    name: "Epic",
    chance: 1.27,
    images: 4,
    path: "/images/epic",
    color: "text-pink-400",
  },
  {
    name: "Legendary",
    chance: 0.98,
    images: 4,
    path: "/images/legendary",
    color: "text-yellow-400 font-bold",
  },
];

// ===== อาวุธ =====
const weaponGacha = [
  {
    name: "Normal",
    chance: 24.73,
    images: 16,
    path: "/images2/normal",
    color: "text-white",
  },
  {
    name: "Uncommon",
    chance: 16.48,
    images: 5,
    path: "/images2/uncommon",
    color: "text-green-400",
  },
  {
    name: "Common",
    chance: 9.83,
    images: 16,
    path: "/images2/common",
    color: "text-blue-400",
  },
  {
    name: "Rare",
    chance: 6.51,
    images: 5,
    path: "/images2/rare",
    color: "text-purple-400",
  },
  {
    name: "Epic",
    chance: 3.65,
    images: 12,
    path: "/images2/epic",
    color: "text-pink-400",
  },
  {
    name: "Legendary",
    chance: 2.38,
    images: 5,
    path: "/images2/legendary",
    color: "text-yellow-400 font-bold",
  },
  {
    name: "God",
    chance: 1.82,
    images: 2,
    path: "/images2/god",
    color: "text-red-400 font-bold",
  },
];

function weightedRandom(groups) {
  const total = groups.reduce((s, g) => s + g.chance, 0);
  let rand = Math.random() * total;

  for (const g of groups) {
    if (rand < g.chance) return g;
    rand -= g.chance;
  }
}

export default function GachaPage() {
  const [cards, setCards] = useState([]);

  const openPack = (groups) => {
    const temp = [];
    for (let i = 0; i < 10; i++) {
      const group = weightedRandom(groups);
      const imgIndex = Math.floor(Math.random() * group.images) + 1;
      temp.push({
        revealed: false,
        name: group.name,
        color: group.color,
        img: `${group.path}/${imgIndex}.png`,
      });
    }
    setCards(temp);
  };

  const revealCard = async (index) => {
    if (cards[index].revealed) return;
    const newCards = [...cards];

    openSound && openSound.play();

    await new Promise((r) => setTimeout(r, 500));
    newCards[index].revealed = true;

    if (
      newCards[index].name === "Legendary" ||
      newCards[index].name === "God"
    ) {
      legendarySound && legendarySound.play();
    }

    setCards(newCards);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🎰 Gacha Simulator
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => openPack(characterGacha)}
          className="px-6 py-3 bg-blue-500 font-semibold rounded-xl hover:bg-blue-400"
        >
          สุ่มตัวประดับ 10 ครั้ง
        </button>
        <button
          onClick={() => openPack(weaponGacha)}
          className="px-6 py-3 bg-red-500 font-semibold rounded-xl hover:bg-red-400"
        >
          สุ่มอาวุธ 10 ครั้ง
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => revealCard(index)}
            className={`bg-zinc-800 rounded-2xl p-3 shadow-lg text-center cursor-pointer hover:scale-105 transition ${
              card.revealed &&
              (card.name === "Legendary" || card.name === "God")
                ? "animate-pulse ring-4 ring-yellow-400 shadow-yellow-400/50"
                : ""
            }`}
          >
            {card.revealed ? (
              <>
                <Image
                  src={card.img}
                  alt={card.name}
                  width={200}
                  height={200}
                  className="rounded-xl mb-2"
                />
                <div className={`text-sm ${card.color}`}>{card.name}</div>
              </>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-5xl">
                ❓
              </div>
            )
            }
          </div>
        ))}
      </div>
    </div>
  );
}
