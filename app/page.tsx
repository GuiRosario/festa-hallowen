"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden bg-gray-900">
      {/* ---------- Estrelas de Fundo ---------- */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        {Array.from({ length: 70 }).map((_, i) => {
          const size = Math.random() * 2 + 2; // 2px a 4px
          return (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-star"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          );
        })}
      </div>

      {/* ---------- Fantasmas ---------- */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-normal">
        <Ghost
          className="absolute top-1/4 left-0 text-ghost-light glow-ghost-light animate-float-ghost md:size-[120px] size-[100px]"
          style={{ animationDelay: "0s", animationDuration: "22s" }}
        />
        <Ghost
          className="absolute top-1/2 left-0 text-ghost-orange glow-ghost-orange animate-float-ghost md:size-[100px] size-[80px]"
          style={{ animationDelay: "8s", animationDuration: "24s" }}
        />
        <Ghost
          className="absolute top-1/3 left-0 text-ghost-purple glow-ghost-purple animate-float-ghost md:size-[110px] size-[85px]"
          style={{ animationDelay: "15s", animationDuration: "26s" }}
        />
        <Ghost
          className="absolute top-3/4 left-0 text-ghost-light glow-ghost-light animate-float-ghost md:size-[90px] size-[70px]"
          style={{ animationDelay: "20s", animationDuration: "21s" }}
        />
      </div>

      {/* ---------- Card do Convite ---------- */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-gray-900/80 p-8 text-center shadow-2xl shadow-halloween-500/20 border-2 border-halloween-500 backdrop-blur-sm">
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
                <span className="font-bold text-white">Data:</span> 15 de
                Novembro, 20:00
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-5 flex-shrink-0 text-halloween-500" />
              <span>
                <span className="font-bold text-white">Local:</span> A Chácara
                Mal Assombrada
              </span>
              {/* Botão do Google Maps com ícone */}
              <a
                href="https://www.google.com/maps/place/10%C2%B014'14.9%22S+48%C2%B011'35.1%22W/@-10.2412589,-48.1952213,15.73z/data=!4m4!3m3!8m2!3d-10.2374592!4d-48.1930796?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D" // substitua pelo link real
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-1 rounded bg-halloween-500 px-3 py-1 text-xs font-bold text-gray-900 hover:bg-halloween-600 transition"
                title="Abrir no Google Maps"
              >
                <MapPin className="h-4 w-4" />
                Abrir
              </a>
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
                href="https://chat.whatsapp.com/HTasNmNOILD4L1luXpnDpe?mode=wwt "
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

      {/* ---------- CSS Inline para Animação das Estrelas ---------- */}
      <style jsx>{`
        @keyframes star-twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-star {
          animation-name: star-twinkle;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </main>
  );
}
