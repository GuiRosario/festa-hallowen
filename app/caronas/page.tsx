"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { MessageCircle, MessageCircleMore } from "lucide-react";

export default function CaronasPage() {
  const [caronas, setCaronas] = useState([]);
  const [form, setForm] = useState({ motorista: "", telefone: "", vagas: "" });
  const [abrirDialog, setAbrirDialog] = useState(false);
  const [caronaSelecionada, setCaronaSelecionada] = useState(null);
  const [passageiro, setPassageiro] = useState({ nome: "", telefone: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [removendo, setRemovendo] = useState<string | null>(null);
  const [isLoadingEntrarCarona, setIsLoadingEntrarCarona] = useState(false);

  async function carregar() {
    try {
      const res = await fetch("/api/caronas", { cache: "no-store" });
      const data = await res.json();
      setCaronas(data);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar caronas");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function cadastrar(e) {
    e.preventDefault();
    const res = await fetch("/api/caronas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success("✅ Carona cadastrada com sucesso!");
      setForm({ motorista: "", telefone: "", vagas: "" });
      carregar();
    } else {
      const err = await res.json();
      toast.error(err.error || "Erro ao cadastrar");
    }
  }

  async function entrarNaCarona() {
    setIsLoadingEntrarCarona(true);
    const res = await fetch("/api/caronas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: caronaSelecionada.id,
        nome: passageiro.nome,
        telefone: passageiro.telefone,
      }),
    });

    if (res.ok) {
      toast.success("🚗 Você entrou na carona!");
      setAbrirDialog(false);
      setPassageiro({ nome: "", telefone: "" });
      carregar();
    } else {
      const err = await res.json();
      toast.error(err.error || "Erro ao entrar na carona");
    }
    setIsLoadingEntrarCarona(false);
  }

  async function removerPassageiro(id, passageiro) {
    if (!confirm(`Remover "${passageiro}" desta carona?`)) return;
    setRemovendo(`${id}-${passageiro}`); // 👈 define o passageiro sendo removido

    try {
      const res = await fetch("/api/caronas", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, passageiro }),
      });

      if (res.ok) {
        toast.success("🧍 Passageiro removido!");
        carregar();
      } else {
        const err = await res.json();
        toast.error(err.error || "Erro ao remover passageiro");
      }
    } catch (e) {
      toast.error("Erro de rede");
    } finally {
      setRemovendo(null); // 👈 limpa o estado de loading
    }
  }

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 py-10">
        Carregando caronas...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      {/* Formulário */}
      <Card className="bg-[#1a1a1a] text-white border border-orange-600 mx-4 sm:mx-0">
        <CardHeader>
          <CardTitle className="text-orange-400">Cadastrar Carona</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={cadastrar} className="space-y-3">
            <Input
              placeholder="Nome do motorista"
              value={form.motorista}
              onChange={(e) => setForm({ ...form, motorista: e.target.value })}
              required
              className="bg-[#2a2a2a] border-orange-700"
            />
            <Input
              placeholder="Telefone"
              value={form.telefone}
              onChange={(e) => {
                let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

                if (valor.length <= 10) {
                  // formato (11) 9999-9999
                  valor = valor.replace(
                    /^(\d{2})(\d{4})(\d{0,4}).*/,
                    "($1) $2-$3"
                  );
                } else {
                  // formato (11) 99999-9999
                  valor = valor.replace(
                    /^(\d{2})(\d{5})(\d{0,4}).*/,
                    "($1) $2-$3"
                  );
                }

                setForm({ ...form, telefone: valor });
              }}
              maxLength={15}
              required
              className="bg-[#2a2a2a] border-orange-700"
            />
            <Input
              placeholder="Número de vagas"
              type="number"
              value={form.vagas}
              onChange={(e) => setForm({ ...form, vagas: e.target.value })}
              required
              className="bg-[#2a2a2a] border-orange-700"
            />
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              Salvar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de caronas */}
      <div className="mt-16">
        <h2 className="font-title text-3xl mb-6 text-center text-white">
          Lista de Caronas
        </h2>
        <div className="bg-gray-900/90 p-6 rounded-2xl border border-halloween-500/30 shadow-lg shadow-halloween-500/10 backdrop-blur-sm mx-4 sm:mx-0">
          {caronas.length === 0 ? (
            <p className="text-gray-400 text-center">
              Nenhuma carona cadastrada ainda.
            </p>
          ) : (
            caronas.map((c) => {
              const vagasRestantes = c.vagasTotais - c.passageiros.length;
              return (
                <Card
                  key={c.id}
                  className="bg-[#1a1a1a] text-white border border-orange-600"
                >
                  <CardHeader>
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      className="text-orange-500 font-semibold"
                    >
                      <p>🚗 {c.motorista} - </p>
                      {
                        <a
                          href={`https://wa.me/55${c.telefone.replace(
                            /\D/g,
                            ""
                          )}?text=${encodeURIComponent(
                            `Oi ${c.motorista}, vi sua carona no site!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-md border border-green-600 text-green-400 hover:bg-green-700 hover:text-white transition"
                          style={{ marginLeft: "4px" }}
                        >
                          <MessageCircleMore className=" size-4" />
                        </a>
                      }
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 text-sm text-gray-300">
                      Vagas restantes:{" "}
                      <span className="text-orange-400 font-semibold">
                        {vagasRestantes}
                      </span>
                    </p>
                    <div className="mb-3">
                      <strong className="text-orange-300">Passageiros:</strong>
                      {c.passageiros.length > 0 ? (
                        <ul className="list-disc ml-6 mt-1 text-sm space-y-1">
                          {c.passageiros.map((p, i) => {
                            const key = `${c.id}-${p}`;
                            const isLoadingBtn = removendo === key;

                            return (
                              <li
                                key={i}
                                className="flex justify-between items-center"
                              >
                                <span>{p.split(" - ")[0]}</span>

                                <div className="flex gap-2">
                                  {/* Botão WhatsApp */}
                                  <a
                                    href={`https://wa.me/55${p
                                      .split(" - ")[1]
                                      .replace(
                                        /\D/g,
                                        ""
                                      )}?text=${encodeURIComponent(
                                      `Oi ${p.split(" - ")[0]}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-md border border-green-600 text-green-400 hover:bg-green-700 hover:text-white transition"
                                  >
                                    <MessageCircleMore className=" size-4" />
                                  </a>

                                  {/* Botão Remover */}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={isLoadingBtn}
                                    className={`border-orange-600 text-orange-400 hover:bg-orange-700 hover:text-white ${
                                      isLoadingBtn
                                        ? "opacity-60 cursor-not-allowed"
                                        : ""
                                    }`}
                                    onClick={() => removerPassageiro(c.id, p)}
                                  >
                                    {isLoadingBtn ? "Removendo..." : "Remover"}
                                  </Button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-400">
                          Nenhum passageiro ainda.
                        </p>
                      )}
                    </div>
                    {vagasRestantes > 0 && (
                      <Button
                        onClick={() => {
                          setCaronaSelecionada(c);
                          setAbrirDialog(true);
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        Entrar na carona
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={abrirDialog} onOpenChange={setAbrirDialog}>
        <DialogContent className="bg-[#1a1a1a] border border-orange-600 text-white">
          <DialogHeader>
            <DialogTitle className="text-orange-400">
              Entrar na carona de {caronaSelecionada?.motorista}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Label>Nome</Label>
            <Input
              value={passageiro.nome}
              onChange={(e) =>
                setPassageiro({ ...passageiro, nome: e.target.value })
              }
              placeholder="Seu nome"
              className="bg-[#2a2a2a] border-orange-700"
            />
            <Label>Telefone</Label>
            <Input
              value={passageiro.telefone}
              onChange={(e) =>
                setPassageiro({ ...passageiro, telefone: e.target.value })
              }
              placeholder="Seu telefone"
              className="bg-[#2a2a2a] border-orange-700"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={entrarNaCarona}
              className="bg-orange-600 hover:bg-orange-700 text-white"
              disabled={isLoadingEntrarCarona}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
