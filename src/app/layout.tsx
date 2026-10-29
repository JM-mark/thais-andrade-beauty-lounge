import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { SITE } from "@/config";
import { Providers } from "@/components/Providers";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], display: "swap", variable: "--font-cormorant" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap", variable: "--font-jost" });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-pinyon" });

// TODO trocar pelo domínio final quando o salão publicar
const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://jm-mark.github.io";
const BASE = SITE.basePath;
const title = "Thaís Andrade Beauty Lounge | Salão de Beleza e Dia da Noiva em Hortolândia";
const description = "Dia da Noiva, cabelo, maquiagem, sobrancelhas e estética em Hortolândia-SP. Sua nova fase começa aqui. Peça seu horário pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title,
  description,
  openGraph: {
    title, description, type: "website", locale: "pt_BR", siteName: SITE.name, url: `${BASE}/`,
    images: [{ url: `${BASE}/og.jpg`, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${BASE}/og.jpg`] },
  icons: {
    icon: [{ url: `${BASE}/icon-32.png`, sizes: "32x32", type: "image/png" }, { url: `${BASE}/icon-192.png`, sizes: "192x192", type: "image/png" }],
    apple: `${BASE}/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = { themeColor: "#F7F2EC", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: SITE.name,
  description,
  url: `${ORIGIN}${BASE}/`,
  telephone: "+" + SITE.WHATSAPP_NUMBER,
  image: `${ORIGIN}${BASE}/og.jpg`,
  address: {
    "@type": "PostalAddress", streetAddress: "R. Inácia de Morães Leite, 106 – Jardim Santa Cândida",
    addressLocality: "Hortolândia", addressRegion: "SP", postalCode: "13185-392", addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  // openingHours: adicionar quando o salão confirmar
  sameAs: [SITE.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${cormorant.variable} ${jost.variable} ${pinyon.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.intro=sessionStorage.getItem('intro')==='1'?'seen':'first'}catch(e){document.documentElement.dataset.intro='first'}" }} />
      </head>
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-marsala focus:px-4 focus:py-2 focus:text-ivory">Ir para o conteúdo</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
