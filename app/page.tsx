"use client";

import { useState, useEffect } from "react";
import {
  Ghost,
  MapPin,
  CalendarClock,
  MessageCircle,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  const toggleMute = () => setMuted(!muted);

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
      {/* ---------- Fantasmas ---------- */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-normal backdrop-blur-sm">
        <Ghost
          className="absolute top-1/4 left-0 text-ghost-light glow-ghost-light animate-float-ghost md:size-[120px] size-[100px]"
          style={{ animationDelay: "0s" }}
        />
        <Ghost
          className="absolute top-1/2 left-0 text-ghost-orange glow-ghost-orange animate-float-ghost md:size-[100px] size-[80px]"
          style={{ animationDelay: "8s" }}
        />
        <Ghost
          className="absolute top-1/3 left-0 text-ghost-purple glow-ghost-purple animate-float-ghost md:size-[110px] size-[85px]"
          style={{ animationDelay: "15s" }}
        />
        <Ghost
          className="absolute top-3/4 left-0 text-ghost-light glow-ghost-light animate-float-ghost md:size-[90px] size-[70px]"
          style={{ animationDelay: "20s" }}
        />
      </div>

      {/* ---------- Música do YouTube ---------- */}
      <iframe
        className="absolute w-0 h-0"
        src={`https://www.youtube.com/embed/gqVyois9mp4?autoplay=1&loop=1&playlist=gqVyois9mp4&controls=0&mute=${
          muted ? 1 : 0
        }`}
        allow="autoplay"
      ></iframe>

      {/* ---------- Card do convite ---------- */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-gray-900/80 p-8 text-center shadow-2xl shadow-halloween-500/20 border-2 border-halloween-500 backdrop-blur-sm">
        {/* Botão de Mutar */}
        <Button
          onClick={toggleMute}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/70 hover:bg-gray-700 text-white z-20"
        >
          {muted ? "🔇" : "🔊"}
        </Button>

        <div className="absolute -top-10 -right-8 text-black/20">
          <Ghost size={150} className="-rotate-12" />
        </div>

        <div className="relative z-10">
          <h2 className="text-xl font-bold uppercase tracking-widest text-halloween-500">
            Você está convidado!
          </h2>
          <h1 className="font-title mt-4 text-5xl text-white">
            Uma Noite Sombria
          </h1>
          <p className="mt-4 text-lg text-gray-300 italic">
            Junte-se a nós para uma noite assustadora de diversão, doces e
            travessuras!
          </p>

          <div className="my-8 border-t border-dashed border-gray-600"></div>

          <div className="space-y-4 text-left text-lg">
            <div className="flex items-center gap-3">
              <CalendarClock className="size-5 flex-shrink-0 text-halloween-500" />
              <span>
                <span className="font-bold text-white">Data:</span> 31 de
                Outubro, 20:00
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-5 flex-shrink-0 text-halloween-500" />
              <span>
                <span className="font-bold text-white">Local:</span> A Mansão
                Mal-Assombrada
              </span>
            </div>
          </div>

          <p className="mt-8 text-2xl font-bold text-white">
            Traga sua melhor fantasia!
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <Button
              asChild
              size="lg"
              className="w-full bg-halloween-500 text-gray-900 hover:bg-halloween-600 font-bold font-sans"
            >
              <Link href="/pagamento">
                <CreditCard className="mr-2 size-5" />
                Confirmar e Pagar (R$ 25)
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full font-sans border-halloween-500/50 text-halloween-500 hover:bg-gray-800 hover:text-halloween-500"
            >
              <a
                href="https://chat.whatsapp.com/SEU-LINK-AQUI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 size-5" />
                Entrar no Grupo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
