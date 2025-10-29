"use client";

import { useState, useEffect } from "react";
import {
  Ghost,
  MapPin,
  CalendarClock,
  MessageCircle,
  CreditCard,
  Volume2,
  VolumeX,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [muted, setMuted] = useState(true);
  const toggleMute = () => setMuted(!muted);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
      {/* Fantasmas */}
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

      {/* Música do YouTube */}
      <iframe
        className="absolute w-0 h-0"
        src={`https://www.youtube.com/embed/gqVyois9mp4?autoplay=1&loop=1&playlist=gqVyois9mp4&mute=${
          muted ? 1 : 0
        }`}
        allow="autoplay"
      ></iframe>

      {/* Botão de Mute + seta */}
      <div className="fixed top-5 right-5 z-50 flex items-center space-x-2">
        {muted && (
          <div className="flex items-center animate-bounce-slow mr-1">
            <span className="text-purple-600 font-semibold text-sm tracking-wide whitespace-nowrap animate-glow mr-1">
              Clique aqui
            </span>
            <ArrowRight size={22} className="text-purple-600 animate-glow" />
          </div>
        )}

        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-gray-900/70 hover:bg-gray-800 text-white shadow-lg transition"
          title={muted ? "Ativar som" : "Desativar som"}
        >
          {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </button>
      </div>

      {/* Card */}
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
                <span className="font-bold text-white">Data:</span> 31 de
                Outubro, 20:00
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <MapPin className="size-5 flex-shrink-0 text-halloween-500" />
                <span>
                  <span className="font-bold text-white">Local:</span> A Mansão
                  Mal-Assombrada
                </span>
              </div>
              {/* Botão do Google Maps */}
              <Button
                asChild
                size="sm"
                className="bg-halloween-500 text-gray-900 hover:bg-halloween-600 flex items-center gap-1"
              >
                <a
                  href="https://maps.google.com/?q=Mansão+Mal+Assombrada"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={16} />
                  Ver mapa
                </a>
              </Button>
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
            {/* Botão Spotify */}
            <Button
              asChild
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold font-sans flex items-center justify-center gap-2"
            >
              <a
                href="https://open.spotify.com/playlist/0EcZNN2ncyFhvbef0aY3Y2?si=0DHCzyfPQ5KluBnC9yp0zg&pt=16e35bcb562ef4c9575166cc941b0e7e&pi=C7B0wshPTeyMw"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* SVG oficial do Spotify */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 168 168"
                  className="w-5 h-5"
                  fill="currentColor"
                >
                  <path d="M84 0C37.584 0 0 37.584 0 84s37.584 84 84 84 84-37.584 84-84S130.416 0 84 0zm38.112 121.2c-1.488 2.496-4.608 3.312-7.104 1.824-19.44-11.664-43.824-14.304-72.672-8.304-2.784.576-5.568-1.344-6.144-4.128-.576-2.784 1.344-5.568 4.128-6.144 31.44-6.048 58.896-3.264 80.784 9.12 2.496 1.44 3.312 4.608 1.008 7.632zm9.12-22.896c-1.776 2.928-5.664 3.84-8.64 2.016-22.248-13.488-56.064-17.376-82.272-10.08-3.408.816-6.912-1.536-7.728-4.896-.816-3.408 1.536-6.912 4.896-7.728 28.8-6.864 65.664-2.688 90.24 11.52 2.88 1.728 3.84 5.664 1.536 8.112zm.144-24.192c-25.68-15.024-68.496-16.416-92.64-9.552-4.032.864-8.16-1.728-9.024-5.76-.864-4.032 1.728-8.16 5.76-9.024 26.64-5.76 73.44-4.128 101.04 10.176 3.6 2.16 4.848 6.816 2.208 10.08-2.64 3.36-7.488 4.464-10.344 3.12z" />
                </svg>
                Playlist Spotify
              </a>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes glow {
          0% {
            opacity: 0.6;
            text-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
          }
          100% {
            opacity: 0.6;
            text-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s infinite ease-in-out;
        }
        .animate-glow {
          animation: glow 1.8s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}
