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
            <span className="text-white font-semibold text-sm tracking-wide whitespace-nowrap animate-glow mr-1">
              Clique aqui
            </span>
            <ArrowRight size={22} className="text-white animate-glow" />
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
                <span className="font-bold text-white">Data:</span> 15 de
                Novembro, 20:00
              </span>
            </div>
            <div className="flex items-center gap-3 justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="size-5 flex-shrink-0 text-halloween-500" />
                <span>
                  <span className="font-bold text-white">Local:</span> A Chácara
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
                  href="https://www.google.com/maps/place/10%C2%B014'14.9%22S+48%C2%B011'35.1%22W/@-10.2374592,-48.1956545,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-10.2374592!4d-48.1930796?entry=ttu&g_ep=EgoyMDI1MTAyNi4wIKXMDSoASAFQAw%3D%3D"
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
