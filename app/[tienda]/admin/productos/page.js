import Link from 'next/link'
import { getProductosPorTienda } from '@/lib/productos'
import styles from '@/styles/Admin.module.css'

export default async function AdminProductos({ params }) {
  const productos = await getProductosPorTienda(params.tienda)

  return (
    <div className={styles.contenedor}>
      <div className={styles.header}>
        <h1>Administrar Productos</h1>
        <Link 
          href={`/${params.tienda}/admin/productos/nuevo`}
          className={styles.boton}
        >
          Nuevo Producto
        </Link>
      </div>

      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>
                <Link
                  href={`/${params.tienda}/admin/productos/editar/${producto.id}`}
                  className={styles.botonEditar}
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
