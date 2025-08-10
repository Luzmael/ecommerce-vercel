'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Alertas from './Alertas'

export default function FormProducto({ tiendaId, producto }) {
  const [form, setForm] = useState(producto || {
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: null
  })
  const [alerta, setAlerta] = useState(null)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      let imagenUrl = form.imagenUrl || ''
      
      // Subir nueva imagen si existe
      if (form.imagen instanceof File) {
        const buffer = await form.imagen.arrayBuffer()
        imagenUrl = await subirImagen(form.imagen.name, buffer)
      }

      const productoData = {
        ...form,
        precio: parseFloat(form.precio),
        imagen: imagenUrl,
        tienda_id: tiendaId
      }

      if (producto) {
        await actualizarProducto(producto.id, productoData)
        setAlerta({ tipo: 'exito', mensaje: 'Producto actualizado' })
      } else {
        await crearProducto(productoData)
        setAlerta({ tipo: 'exito', mensaje: 'Producto creado' })
        router.push(`/${tiendaId}/admin/productos`)
      }
    } catch (error) {
      setAlerta({ tipo: 'error', mensaje: error.message })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Alertas alerta={alerta} />
      
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>

      <div>
        <label>Imagen:</label>
        <input
          type="file"
          name="imagen"
          onChange={handleChange}
          accept="image/*"
        />
        {form.imagenUrl && (
          <img src={form.imagenUrl} width="100" alt="Previsualización" />
        )}
      </div>

      <button type="submit">
        {producto ? 'Actualizar' : 'Crear'} Producto
      </button>
    </form>
  )
}
