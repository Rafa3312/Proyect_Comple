'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from '@/components/SearchInput';  // Asegúrate de tener este componente
import Link from 'next/link';
import BorrarProducto from '@/components/borrarProd'; // Componente para borrar productos

async function getProductos() {
  const url = "http://localhost:3000/productos/mostrar";
  const productos = await axios.get(url);
  return productos.data;
}

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  
  useEffect(() => {
    const fetchProductos = async () => {
      const productosData = await getProductos();
      setProductos(productosData);
      setFilteredProductos(productosData);
    };
    fetchProductos();
  }, []);

  const handleSearch = async (query) => {
    if (query) {
      const filtered = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProductos(filtered);
    } else {
      setFilteredProductos(productos);
    }
  };

  return (
    <>
      <h1>Productos</h1>
      <SearchInput 
        label="Buscar Producto" 
        apiUrl="http://localhost:3000/productos/mostrar" 
        type="producto" 
        onSearch={handleSearch}
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Borrar</th>
            <th>Modificar</th> 
          </tr>
        </thead>
        <tbody>
          {
            filteredProductos.map((producto, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td><BorrarProducto id={producto.id} /></td>
                <td>
                  <Link href={`/productos/modificar/${producto.id}`} className="btn btn-primary">
                    Modificar
                  </Link>
                </td> 
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Link href={`/productos/nuevo/`} className="btn btn-primary">
          Nuevo
        </Link>
      </div>
    </>
  );
}
