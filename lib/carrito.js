// Persistencia del carrito en localStorage (adaptado para SSR)
export function getCarrito(tiendaSlug) {
  if (typeof window !== 'undefined') {
    const carrito = localStorage.getItem(`carrito_${tiendaSlug}`)
    return carrito ? JSON.parse(carrito) : []
  }
  return []
}

export function guardarCarrito(tiendaSlug, items) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`carrito_${tiendaSlug}`, JSON.stringify(items))
  }
}

export function agregarAlCarrito(tiendaSlug, producto) {
  const carrito = getCarrito(tiendaSlug)
  const nuevoCarrito = [...carrito, producto]
  guardarCarrito(tiendaSlug, nuevoCarrito)
  return nuevoCarrito
}

export function eliminarDelCarrito(tiendaSlug, productoId) {
  const carrito = getCarrito(tiendaSlug)
  const nuevoCarrito = carrito.filter(item => item.id !== productoId)
  guardarCarrito(tiendaSlug, nuevoCarrito)
  return nuevoCarrito
}

export function limpiarCarrito(tiendaSlug) {
  guardarCarrito(tiendaSlug, [])
}
