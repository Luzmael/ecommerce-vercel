import Link from 'next/link'
import { getTiendas } from '@/lib/tiendas'
import styles from '@/styles/Home.module.css'

export default async function Home() {
  const tiendas = await getTiendas()

  return (
    <div className={styles.container}>
      <h1>Nuestras Tiendas</h1>
      
      <div className={styles.grid}>
        {tiendas.map(tienda => (
          <Link 
            key={tienda.id} 
            href={`/${tienda.slug}`}
            className={styles.card}
          >
            <h2>{tienda.nombre}</h2>
            <p>{tienda.descripcion}</p>
            <span>Tel: {tienda.telefono}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
