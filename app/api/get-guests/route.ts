import { NextResponse } from "next/server";
import { getSheet } from "@/lib/sheets";

// Habilita o cache (revalida a cada 60s) para não sobrecarregar a API
export const revalidate = 60;

export async function GET() {
  try {
    const sheet = await getSheet();
    const rows = await sheet.getRows();

    const guests = rows.map((row) => ({
      // IMPORTANTE: "Nome" e "Pagamento" devem ser EXATAMENTE
      // iguais aos nomes das colunas na sua planilha!
      name: row.get("Nome"),
      payment: row.get("Pagamento"),
    }));

    return NextResponse.json(guests);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar convidados" },
      { status: 500 }
    );
  }
}
