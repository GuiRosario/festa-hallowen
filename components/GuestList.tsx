"use client";

// Imports
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

// --- Componente da Lista ---

interface Guest {
  name: string;
  payment: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Note: Não precisa exportar SWRConfig, o Next 14+ lida com isso.
export function GuestList() {
  const {
    data: guests,
    error,
    isLoading,
  } = useSWR<Guest[]>("/api/get-guests", fetcher, {
    refreshInterval: 30000, // Recarrega a lista a cada 30 segundos
  });

  if (isLoading) {
    return (
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>
    );
  }

  if (error || !guests) {
    return (
      <p className="text-center text-destructive">
        Não foi possível carregar a lista.
      </p>
    );
  }

  return (
    <Table>
      <TableCaption>A lista é atualizada automaticamente.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70%]">Nome</TableHead>
          <TableHead className="text-right">Pagamento</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {guests.length === 0 && (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              Ninguém confirmou ainda. Seja o primeiro!
            </TableCell>
          </TableRow>
        )}
        {guests.map((guest, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{guest.name}</TableCell>
            <TableCell className="text-right">
              {guest.payment === "Sim" ? (
                <span className="font-medium text-green-600">
                  ✅ Confirmado
                </span>
              ) : (
                <span className="text-yellow-600">⏳ Aguardando</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
