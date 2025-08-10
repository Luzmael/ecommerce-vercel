const { initDB } = require('../lib/db')

async function setup() {
  try {
    await initDB()
    console.log('✅ Base de datos inicializada correctamente')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error inicializando DB:', error)
    process.exit(1)
  }
}

setup()
