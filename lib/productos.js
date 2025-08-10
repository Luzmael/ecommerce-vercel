import { query } from './db'

export async function crearProducto(productoData) {
  const { nombre, descripcion, precio, imagen, tienda_id } = productoData
  const { rows } = await query(
    `INSERT INTO productos 
     (nombre, descripcion, precio, imagen, tienda_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nombre, descripcion, precio, imagen, tienda_id]
  )
  return rows[0]
}

export async function actualizarProducto(id, productoData) {
  const { nombre, descripcion, precio, imagen } = productoData
  const { rows } = await query(
    `UPDATE productos 
     SET nombre = $1, descripcion = $2, precio = $3, imagen = $4
     WHERE id = $5 RETURNING *`,
    [nombre, descripcion, precio, imagen, id]
  )
  return rows[0]
}

export async function eliminarProducto(id) {
  await query('DELETE FROM productos WHERE id = $1', [id])
}

export async function getProductosPorTienda(tienda_id) {
  const { rows } = await query(
    'SELECT * FROM productos WHERE tienda_id = $1 ORDER BY creado_en DESC',
    [tienda_id]
  )
  return rows
}

export async function getProducto(id) {
  const { rows } = await query(
    'SELECT * FROM productos WHERE id = $1 LIMIT 1',
    [id]
  )
  return rows[0]
}
