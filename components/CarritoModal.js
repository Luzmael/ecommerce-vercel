'use client'
import { useState, useEffect } from 'react'
import { FiShoppingCart, FiX, FiTrash2 } from 'react-icons/fi'
import { getCarrito, eliminarDelCarrito } from '@/lib/carrito'
import Alertas from './Alertas'
import styles from '@/styles/Carrito.module.css'

export default function CarritoModal({ tienda }) {
  const [carrito, setCarrito] = useState([])
  const [mostrar, setMostrar] = useState(false)
  const [alerta, setAlerta] = useState(null)

  useEffect(() => {
    setCarrito(getCarrito(tienda.slug))
  }, [tienda.slug])

  const handleEliminar = (productoId) => {
    const nuevoCarrito = eliminarDelCarrito(tienda.slug, productoId)
    setCarrito(nuevoCarrito)
    setAlerta({ tipo: 'exito', mensaje: 'Producto eliminado' })
  }

  const total = carrito.reduce((sum, item) => sum + item.precio, 0)

  return (
    <>
      <button 
        className={styles.botonFlotante}
        onClick={() => setMostrar(true)}
      >
        <FiShoppingCart />
        {carrito.length > 0 && (
          <span className={styles.contador}>{carrito.length}</span>
        )}
      </button>

      {mostrar && (
        <div className={styles.modal}>
          <div className={styles.contenido}>
            <button 
              className={styles.cerrar}
              onClick={() => setMostrar(false)}
            >
              <FiX />
            </button>

            <h2>Tu Carrito</h2>
            <Alertas alerta={alerta} />

            {carrito.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <>
                <ul className={styles.lista}>
                  {carrito.map(item => (
                    <li key={item.id} className={styles.item}>
                      <div>
                        <h3>{item.nombre}</h3>
                        <p>${item.precio.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => handleEliminar(item.id)}
                        className={styles.botonEliminar}
                      >
                        <FiTrash2 />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className={styles.total}>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <WhatsappButton 
                  telefono={tienda.telefono}
                  mensaje={`Hola, quiero pedir estos productos:\n${carrito.map(p => `- ${p.nombre} ($${p.precio})`).join('\n')}\n\nTotal: $${total.toFixed(2)}`}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
