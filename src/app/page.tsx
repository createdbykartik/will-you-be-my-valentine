"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Position = { x: number; y: number };

function randomInt(minInclusive: number, maxInclusive: number) {
  const min = Math.ceil(minInclusive);
  const max = Math.floor(maxInclusive);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState<Position>({ x: 0, y: 0 });
  const [noIsRunaway, setNoIsRunaway] = useState(false);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  const celebrationPattern = useMemo(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
        <rect width="240" height="240" fill="white"/>
        <text x="24" y="70" font-size="44">🐬</text>
        <text x="140" y="110" font-size="44">🐧</text>
        <text x="40" y="190" font-size="44">🐧</text>
        <text x="150" y="210" font-size="44">🐬</text>
      </svg>
    `;

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  const margin = 16;

  const moveNoButton = () => {
    const rect = noButtonRef.current?.getBoundingClientRect();
    const buttonWidth = rect?.width ?? 140;
    const buttonHeight = rect?.height ?? 48;

    const yesRect = yesButtonRef.current?.getBoundingClientRect();

    const maxX = Math.max(margin, window.innerWidth - buttonWidth - margin);
    const maxY = Math.max(margin, window.innerHeight - buttonHeight - margin);

    for (let attempt = 0; attempt < 25; attempt++) {
      const x = randomInt(margin, maxX);
      const y = randomInt(margin, maxY);

      if (!yesRect) {
        setNoPosition({ x, y });
        return;
      }

      const overlapsYes = !(
        x + buttonWidth < yesRect.left - margin ||
        x > yesRect.right + margin ||
        y + buttonHeight < yesRect.top - margin ||
        y > yesRect.bottom + margin
      );

      if (!overlapsYes) {
        setNoPosition({ x, y });
        return;
      }
    }

    setNoPosition({
      x: randomInt(margin, maxX),
      y: randomInt(margin, maxY),
    });
  };

  useEffect(() => {
    moveNoButton();

    const handleResize = () => moveNoButton();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!noIsRunaway) return;
    requestAnimationFrame(() => moveNoButton());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noIsRunaway]);

  if (accepted) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 text-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply"
          style={{
            backgroundImage: `url('${basePath}/minions.gif')`,
            backgroundRepeat: "repeat",
            backgroundSize: "240px 240px",
          }}
        />

        <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
          <div className="text-4xl font-black tracking-tight text-red-600 sm:text-5xl">
            LET’S GOOO 🎉
          </div>
          <p className="max-w-xl text-balance text-lg text-zinc-700">
            You just made a grown adult do a little victory dance.
          </p>

          <div className="w-full overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
            <div className="relative aspect-[4/3] w-full">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: celebrationPattern,
                  backgroundRepeat: "repeat",
                  backgroundSize: "240px 240px",
                }}
              />
              <Image
                src={`${basePath}/valentine.jpg`}
                alt="Our valentine moment"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-pink-50 to-rose-50 text-foreground">
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-10 px-6 py-16 text-center">
        <div className="space-y-3">
          <div className="text-2xl font-semibold text-zinc-800">Dear Sravya,</div>
          <h1 className="text-balance text-4xl font-black tracking-tight text-red-600 sm:text-6xl">
            Will you be my valentine?
          </h1>
          <p className="text-balance text-base text-zinc-700 sm:text-lg">
            Please select an option. No pressure. (There is a little pressure.)
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setAccepted(true)}
            ref={yesButtonRef}
            className="rounded-full bg-foreground px-7 py-3 text-base font-semibold text-background shadow-sm transition-transform active:scale-[0.98]"
          >
            Yes
          </button>

          {!noIsRunaway && (
            <button
              ref={noButtonRef}
              type="button"
              onMouseEnter={() => setNoIsRunaway(true)}
              onPointerEnter={() => setNoIsRunaway(true)}
              onFocus={() => setNoIsRunaway(true)}
              className="rounded-full border border-black/15 bg-white px-7 py-3 text-base font-semibold text-zinc-800 shadow-sm"
              aria-label="No (this button moves)"
            >
              No
            </button>
          )}
        </div>

        {noIsRunaway && (
          <button
            ref={noButtonRef}
            type="button"
            onPointerEnter={moveNoButton}
            onMouseEnter={moveNoButton}
            onMouseMove={moveNoButton}
            onPointerDown={moveNoButton}
            onTouchStart={moveNoButton}
            onFocus={moveNoButton}
            className="fixed z-20 rounded-full border border-black/15 bg-white px-7 py-3 text-base font-semibold text-zinc-800 shadow-sm"
            style={{ left: noPosition.x, top: noPosition.y }}
            aria-label="No (this button moves)"
          >
            No
          </button>
        )}
      </main>
    </div>
  );
}
