export const SITE = {
  name: "Thaís Andrade Beauty Lounge",
  slogan: "Beauty is power!",
  // TODO confirmar que é o WhatsApp principal
  WHATSAPP_NUMBER: "5519987172370",
  phoneDisplay: "(19) 98717-2370",
  address: "R. Inácia de Morães Leite, 106 – Jardim Santa Cândida, Hortolândia – SP, 13185-392",
  geo: { lat: -22.9019284, lng: -47.1718099 },
  // TODO confirmar abertura e dias; Google indica "fecha às 18:00"
  hours: "Consulte os horários pelo WhatsApp (fecha às 18h)",
  rating: { value: 5.0, count: 67 }, // TODO atualizar antes de publicar
  instagram: "https://www.instagram.com/thaisandradebeautylounge",
  instagramHandle: "@thaisandradebeautylounge",
  maps: "https://www.google.com/maps/search/?api=1&query=THAIS+ANDRADE+BEAUTY+LOUNGE+Hortol%C3%A2ndia",
  mapsEmbed: "https://www.google.com/maps?q=-22.9019284,-47.1718099&z=16&output=embed",
  linktree: "https://linktr.ee/thaisandradebeautylounge",
  bookingWebhook: process.env.NEXT_PUBLIC_BOOKING_WEBHOOK_URL || "",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export const wa = (text?: string) =>
  `https://wa.me/${SITE.WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Prefixa o basePath em caminhos locais (/fotos, /brand). Seguro em componentes de servidor e de cliente. */
export const asset = (u: string) => (u.startsWith("/") ? `${SITE.basePath}${u}` : u);
