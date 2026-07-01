// Simple WhatsApp share helper - opens wa.me deep link
export function sendWhatsApp(phone: string, message: string) {
  const digits = phone.replace(/[^0-9]/g, "");
  const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  if (typeof window !== "undefined") window.open(url, "_blank", "noopener");
}
