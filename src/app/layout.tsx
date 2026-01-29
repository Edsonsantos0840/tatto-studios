import type { Metadata } from "next";
import { UnifrakturMaguntia, Raleway } from "next/font/google";
import "./globals.css";

const unifraktur = UnifrakturMaguntia({
  variable: "--font-unifrakturMaguntia",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Martinez Tattoo Studio | Tatuagens, Piercings e Arte Exclusiva",
  description:
    "Descubra o Martinez Tattoo Studio: arte exclusiva, cuidados especializados, piercings seguros e tatuagens personalizadas em Campinas. Peça seu orçamento!",
  keywords: [
    "Tatuagem Campinas",
    "Estúdio de Tatuagem",
    "Piercing Campinas",
    "Cuidados pós-tatuagem",
    "Design personalizado",
    "Tatuador Campinas",
    "Arte na Pele",
    "Martinez Tattoo Studio",
    "Orçamento de tatuagem",
  ],
  authors: [{ name: "Edson Santos", url: "https://protifolio-eta.vercel.app/" }],
  creator: "Edson Santos",
  publisher: "Edson Santos",
  metadataBase: new URL("https://nice-tattoo-studio.vercel.app"),
  openGraph: {
    title: "Martinez Tattoo Studio | Tatuagens e Piercings em Campinas",
    description:
      "Transforme sua pele em uma obra de arte com tatuagens exclusivas, piercings estilosos e atendimento premium no Martinez Tattoo Studio.",
    siteName: "Martinez Tattoo Studio",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (
    <html lang="pt-br">
      <body className={`${unifraktur.variable} ${raleway.variable}`}>
        {children}
      </body>
    </html>
  );
}
