import { query } from './db'

export async function getTiendas() {
  const { rows } = await query('SELECT * FROM tiendas WHERE activa = true')
  return rows
}

export async function getTiendaBySlug(slug) {
  const { rows } = await query(
    'SELECT * FROM tiendas WHERE slug = $1 LIMIT 1',
    [slug]
  )
  return rows[0]
}

export async function crearTienda(tiendaData) {
  const { nombre, slug, descripcion, telefono } = tiendaData
  const { rows } = await query(
    `INSERT INTO tiendas (nombre, slug, descripcion, telefono)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [nombre, slug, descripcion, telefono]
  )
  return rows[0]
}
