"use client"

export function FloatingWhatsAppGroup() {
  const whatsappLink = 'https://wa.me/971525210658?text=Hi%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services.'

  return (
    <div className="fixed right-4 bottom-6 z-50">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg ring-2 ring-white/10"
        title="Chat with us on WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M20.52 3.478A11.856 11.856 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.11.55 4.074 1.6 5.83L0 24l6.39-1.65A11.893 11.893 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.9-.416-3.7-1.48-5.322z" fill="#ffffff" opacity="0.06"/>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.098-.472-.149-.672.15-.198.297-.768.966-.942 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.476-.885-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.151-.174.2-.298.3-.497.1-.198.05-.372-.025-.521-.075-.149-.672-1.62-.92-2.219-.242-.58-.487-.5-.672-.51l-.577-.01c-.2 0-.52.074-.793.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.26.489 1.692.626.71.226 1.356.194 1.868.118.57-.085 1.758-.718 2.007-1.41.25-.69.25-1.282.174-1.41-.074-.127-.272-.198-.57-.347z" fill="#ffffff"/>
        </svg>
      </a>
    </div>
  )
}
