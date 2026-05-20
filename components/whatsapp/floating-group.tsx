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
        <img
          src="/WhatsApp_icon.png"
          alt="WhatsApp"
          className="w-8 h-8 object-contain"
          draggable={false}
        />
      </a>
    </div>
  )
}
