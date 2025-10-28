"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { GuestList } from "@/components/GuestList";
import { ArrowLeft, Ghost } from "lucide-react";

// ---------- Schema de validação ----------
const formSchema = z.object({
  name: z.string().min(3, "Seu nome precisa ter pelo menos 3 letras."),
  phone: z.string().min(10, "Digite um telefone ou WhatsApp válido."),
});

export default function PaymentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/add-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Falha no servidor.");

      toast.success("Presença Confirmada!", {
        description: "Seu nome foi para a lista. Agora é só pagar o PIX.",
      });
      form.reset();
      setFormSubmitted(true);
    } catch (error) {
      toast.error("Ops! Algo deu errado.", {
        description: "Não foi possível enviar seus dados.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative overflow-hidden container mx-auto p-4 md:p-8 max-w-4xl">
      {/* ---------- Camada de Fantasmas de Fundo ---------- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Ghost
          className="absolute top-1/4 left-0 text-ghost-light glow-ghost-light animate-float-ghost"
          size={120}
          style={{ animationDelay: "0s", animationDuration: "22s" }}
        />
        <Ghost
          className="absolute top-1/2 left-0 text-ghost-orange glow-ghost-orange animate-float-ghost"
          size={100}
          style={{ animationDelay: "8s", animationDuration: "24s" }}
        />
        <Ghost
          className="absolute top-1/3 left-0 text-ghost-purple glow-ghost-purple animate-float-ghost"
          size={110}
          style={{ animationDelay: "15s", animationDuration: "26s" }}
        />
        <Ghost
          className="absolute top-3/4 left-0 text-ghost-light glow-ghost-light animate-float-ghost"
          size={90}
          style={{ animationDelay: "20s", animationDuration: "21s" }}
        />
      </div>

      {/* ---------- Conteúdo Principal ---------- */}
      <div className="relative z-10">
        {/* Botão de Voltar */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="mb-6 font-sans border-halloween-500/50 text-halloween-500 hover:bg-gray-800 hover:text-halloween-500"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Convite
          </Link>
        </Button>

        {/* Título */}
        <div className="text-center mb-10">
          <h1 className="font-title text-4xl md:text-5xl text-white">
            Confirmação e Pagamento
          </h1>
          <p className="text-lg text-gray-300 mt-3 italic">
            Preencha seus dados e faça o pagamento para garantir sua vaga na
            noite.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Formulário */}
          <div className="bg-gray-900/90 p-6 rounded-2xl border border-halloween-500/30 shadow-lg shadow-halloween-500/10 backdrop-blur-sm">
            <h2 className="font-title text-2xl mb-5 text-center text-gray-100">
              1. Confirme seus Dados
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans text-gray-400">
                        Nome Completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Seu nome..."
                          {...field}
                          className="font-sans"
                        />
                      </FormControl>
                      <FormMessage className="font-sans" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans text-gray-400">
                        Telefone (WhatsApp)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(XX) 9XXXX-XXXX"
                          {...field}
                          className="font-sans"
                        />
                      </FormControl>
                      <FormMessage className="font-sans" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full font-sans font-bold bg-halloween-500 text-gray-900 hover:bg-halloween-600"
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? "Enviando..." : "Confirmar Presença"}
                </Button>
              </form>
            </Form>
          </div>

          {/* PIX */}
          <div className="bg-gray-900/90 p-6 rounded-2xl border border-halloween-500/30 shadow-lg shadow-halloween-500/10 backdrop-blur-sm">
            <h2 className="font-title text-2xl mb-5 text-center text-gray-100">
              2. Pague o PIX
            </h2>
            <p className="text-center text-gray-300 mb-4">
              Valor:{" "}
              <span className="font-bold text-halloween-500 text-2xl">
                R$ 25,00
              </span>
            </p>
            <div className="bg-white p-4 rounded-lg flex justify-center max-w-xs mx-auto">
              <Image
                src="/qrcode.png"
                alt="QR Code PIX para a festa"
                width={250}
                height={250}
                priority
              />
            </div>
            <p className="text-sm text-center text-gray-400 mt-4">
              <strong>Chave Copia e Cola:</strong>
              <br />
              <span className="text-xs break-all font-sans">
                00020126540014BR.GOV.BCB.PIX0132gdasilvarosario+nubank@gmail.com520400005303986540525.005802BR5925Guilherme
                da Silva Rosari6009SAO PAULO62140510xgvJQml74R6304052A
              </span>
            </p>
          </div>
        </div>

        {/* Lista de Convidados */}
        <div className="mt-16">
          <h2 className="font-title text-3xl mb-6 text-center text-white">
            Lista de Convidados
          </h2>
          <div className="bg-gray-900/90 p-6 rounded-2xl border border-halloween-500/30 shadow-lg shadow-halloween-500/10 backdrop-blur-sm">
            <div className="font-sans">
              <GuestList key={formSubmitted ? 1 : 0} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
