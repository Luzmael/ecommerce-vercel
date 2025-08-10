import { put, del } from '@vercel/blob'

export async function subirImagen(nombre, buffer) {
  const blob = await put(`productos/${nombre}`, buffer, {
    access: 'public',
    contentType: 'image/webp'
  })
  return blob.url
}

export async function eliminarImagen(url) {
  await del(url)
}

export async function manejarUpload(file) {
  const buffer = await file.arrayBuffer()
  return await subirImagen(file.name, buffer)
}
