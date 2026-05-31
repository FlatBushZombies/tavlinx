export function formatWhatsappPhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

export function isValidWhatsappPhone(phone: string): boolean {
  const digits = formatWhatsappPhone(phone)
  return digits.length >= 8 && digits.length <= 15
}
