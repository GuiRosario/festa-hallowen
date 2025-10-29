import { Inter, Cinzel_Decorative, Merriweather } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Fonte Sans-Serif padrão (para UI)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Nova Fonte do Título
const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-cinzel-decorative",
});

// Nova Fonte do Corpo
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
});

// Metadata do site
export const metadata = {
  title: "Festa Halloween",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-br"
      className={`${inter.variable} ${cinzel.variable} ${merriweather.variable}`}
    >
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
