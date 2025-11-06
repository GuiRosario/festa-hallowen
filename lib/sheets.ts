import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// Validação das variáveis de ambiente
if (!process.env.GOOGLE_SHEET_ID) {
  throw new Error("GOOGLE_SHEET_ID is not defined");
}
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
  throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL is not defined");
}
if (!process.env.GOOGLE_PRIVATE_KEY) {
  throw new Error("GOOGLE_PRIVATE_KEY is not defined");
}

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID,
  serviceAccountAuth
);

/**
 * Carrega e retorna a aba da planilha pelo nome.
 * @param sheetName Nome da aba (ex: "Convidados" ou "Caronas")
 */
export async function getSheet(sheetName?: string) {
  await doc.loadInfo();

  if (sheetName) {
    const sheet = doc.sheetsByTitle[sheetName];
    if (!sheet)
      throw new Error(`Aba "${sheetName}" não encontrada na planilha.`);
    return sheet;
  }

  // Se não passar o nome, retorna a primeira aba
  return doc.sheetsByIndex[0];
}
