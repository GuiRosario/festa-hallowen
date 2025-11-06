import { NextResponse } from "next/server";
import { getSheet } from "@/lib/sheets";

export async function GET() {
  const sheet = await getSheet("Caronas");
  const rows = await sheet.getRows();

  const data = rows.map((r) => ({
    id: r.rowNumber,
    motorista: r.get("Motorista"),
    telefone: r.get("Telefone"),
    vagasTotais: Number(r.get("Vagas")),
    passageiros: (r.get("Passageiros") || "")
      .split(",")
      .map((p: string) => p.trim())
      .filter(Boolean),
  }));

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const { motorista, telefone, vagas } = await req.json();

    if (!motorista || !telefone || !vagas)
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });

    const sheet = await getSheet("Caronas");
    await sheet.addRow({
      Motorista: motorista,
      Telefone: telefone,
      Vagas: vagas,
      Passageiros: "",
    });

    return NextResponse.json({ message: "Carona adicionada com sucesso!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao salvar na planilha" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { id, nome, telefone } = await req.json();

  if (!id || !nome || !telefone)
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });

  const sheet = await getSheet("Caronas");
  const rows = await sheet.getRows();
  const row = rows.find((r) => r.rowNumber === id);

  if (!row)
    return NextResponse.json(
      { error: "Carona não encontrada" },
      { status: 404 }
    );

  const passageiros = (row.get("Passageiros") || "")
    .split(",")
    .map((p: string) => p.trim())
    .filter(Boolean);

  const vagasTotais = Number(row.get("Vagas"));

  if (passageiros.length >= vagasTotais)
    return NextResponse.json(
      { error: "Sem vagas disponíveis" },
      { status: 400 }
    );

  passageiros.push(`${nome} - ${telefone}`);
  row.set("Passageiros", passageiros.join(", "));
  await row.save();

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  try {
    const { id, passageiro } = await req.json();

    if (!id || !passageiro)
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });

    const sheet = await getSheet("Caronas");
    const rows = await sheet.getRows();
    const row = rows.find((r) => r.rowNumber === id);

    if (!row)
      return NextResponse.json(
        { error: "Carona não encontrada" },
        { status: 404 }
      );

    let passageiros = (row.get("Passageiros") || "")
      .split(",")
      .map((p: string) => p.trim())
      .filter(Boolean);

    const antes = passageiros.length;
    passageiros = passageiros.filter((p: string) => p !== passageiro);

    if (passageiros.length === antes)
      return NextResponse.json(
        { error: "Passageiro não encontrado" },
        { status: 404 }
      );

    row.set("Passageiros", passageiros.join(", "));
    await row.save();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao remover passageiro" },
      { status: 500 }
    );
  }
}
