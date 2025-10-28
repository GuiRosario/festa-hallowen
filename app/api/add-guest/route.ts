import { NextResponse } from "next/server";
import { getSheet } from "@/lib/sheets";

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Nome e telefone são obrigatórios" },
        { status: 400 }
      );
    }

    const sheet = await getSheet();

    // Adiciona a nova linha
    // IMPORTANTE: O nome da coluna aqui ("Nome", "Telefone")
    // deve ser EXATAMENTE igual ao da sua planilha!
    await sheet.addRow({
      Nome: name,
      Telefone: phone,
      Timestamp: new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      }),
      Pagamento: "Não", // Começa como "Não"
    });

    return NextResponse.json({ message: "Convidado adicionado com sucesso!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao salvar na planilha" },
      { status: 500 }
    );
  }
}
