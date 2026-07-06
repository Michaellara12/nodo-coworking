/* Datos de contacto y redes de Innfiltrados, usados en todo el sitio. */

export const SITE = {
  name: "Innfiltrados",
  tagline: "Tours de inmersión empresarial",
  city: "Bogotá, Colombia",
  phone: "+57 300 539 3295",
  phoneHref: "tel:+573005393295",
  email: "hola@innfiltrados.com",
  instagram: "https://www.instagram.com/innfiltrados",
  linkedin: "https://www.linkedin.com/company/innfiltrados/",
};

export const waLink = (mensaje: string) =>
  `https://wa.me/573005393295?text=${encodeURIComponent(mensaje)}`;

export const WA_GENERAL = waLink(
  "¡Hola! Quiero más información sobre las misiones de Innfiltrados."
);
