'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from '@/components/SearchInput';  // Asegúrate de tener este componente
import Link from 'next/link';
import BorrarUsuario from '@/components/borrarUsu'; // Componente para borrar usuarios

async function getUsuarios() {
  const url = "http://localhost:3000/usuarios/mostrar";
  const usuarios = await axios.get(url);
  return usuarios.data;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  
  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuariosData = await getUsuarios();
      setUsuarios(usuariosData);
      setFilteredUsuarios(usuariosData);  // Inicialmente mostramos todos los usuarios
    };
    fetchUsuarios();
  }, []);

  const handleSearch = (query) => {
    if (query) {
      const filtered = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsuarios(filtered);
    } else {
      setFilteredUsuarios(usuarios);  // Si no hay búsqueda, mostramos todos los usuarios
    }
  };

  return (
    <>
      <h1>Usuarios</h1>
      <SearchInput 
        label="Buscar Usuario" 
        apiUrl="http://localhost:3000/usuarios/mostrar" 
        type="usuario" 
        onSearch={handleSearch}
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Borrar</th>
            <th>Modificar</th> 
          </tr>
        </thead>
        <tbody>
          {
            filteredUsuarios.map((usuario, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.usuario}</td>
                <td><BorrarUsuario id={usuario.id} /></td>
                <td>
                  <Link href={`/usuarios/modificar/${usuario.id}`} className="btn btn-primary">
                    Modificar
                  </Link>
                </td> 
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Link href={`/usuarios/nuevo/`} className="btn btn-primary">
          Nuevo
        </Link>
      </div>
    </>
  );
}
