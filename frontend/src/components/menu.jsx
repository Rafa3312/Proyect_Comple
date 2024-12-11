"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado del término de búsqueda
  const [results, setResults] = useState([]); // Resultados de búsqueda
  const [selectedId, setSelectedId] = useState(null); // ID seleccionado

  // Manejar cambios en el input de búsqueda
  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      try {
        const response = await axios.get(`/usuarios/mostrar?search=${query}`);
        setResults(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error al buscar:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  // Seleccionar un elemento de la lista de resultados
  const handleSelect = (item) => {
    setSelectedId(item.id);
    setSearchQuery(item.nombre);
    setResults([]);
  };

  // Manejar envío del formulario de búsqueda
  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      // Ejemplo de procesamiento del término de búsqueda
      const response = await axios.get(`/usuarios/mostrar?search=${searchQuery}`);
      console.log("Resultados de búsqueda enviados:", response.data);
      alert(`Búsqueda enviada: ${searchQuery}`);
    } catch (error) {
      console.error("Error al enviar búsqueda:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/noticias">
                Noticias
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/usuarios/mostrar">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/productos/mostrar">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/ventas/mostrar">
                Ventas
              </Link>
            </li>
          </ul>
          <form className="d-flex position-relative" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar usuario"
              aria-label="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>

            {/* Resultados de búsqueda */}
            {results.length > 0 && (
              <ul
                className="list-group position-absolute mt-2"
                style={{
                  width: "100%",
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {results.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item"
                    onClick={() => handleSelect(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.nombre}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}
