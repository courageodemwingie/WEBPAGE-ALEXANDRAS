document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]")

  if (!link) return

  const href = link.href

  let destination = ""

  if (href.includes("wa.me/message/IPJ3FHFSA4XUF1")) {
    destination = "general_whatsapp"
  } else if (href.includes("wa.me/2348133695329")) {
    destination = "bridal_plants_bookings_whatsapp"
  }

  if (!destination) return

  if (typeof window.gtag !== "function") return

  window.gtag("event", "whatsapp_click", {
    destination,
    link_text: link.textContent.trim(),
    page_path: window.location.pathname,
  })
})