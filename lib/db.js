import { db } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

// Configuración optimizada para Vercel
const pool = new db.Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export async function getClient() {
  noStore()
  return await pool.connect()
}

export async function query(sql, params = []) {
  const client = await getClient()
  try {
    const res = await client.query(sql, params)
    return res
  } finally {
    client.release()
  }
}

// Creación de tablas iniciales
export async function initDB() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS tiendas (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        slug VARCHAR(50) UNIQUE NOT NULL,
        descripcion TEXT,
        telefono VARCHAR(20) NOT NULL,
        activa BOOLEAN DEFAULT true,
        creado_en TIMESTAMP DEFAULT NOW()
      )
    `)

    await query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10,2) NOT NULL,
        imagen VARCHAR(255),
        tienda_id INTEGER REFERENCES tiendas(id),
        creado_en TIMESTAMP DEFAULT NOW()
      )
    `)
  } catch (error) {
    console.error('Error inicializando DB:', error)
    throw error
  }
}
