"use client";

import axios from "axios";
import { useState } from "react";

// Función para guardar la venta
async function guardarVenta(e) {
    e.preventDefault();
    console.log("Estas en guardarVenta");

    const url = "http://localhost:3000/ventas/nueva";
    const datos = {
        cantidad: document.getElementById("cantidad").value,
        idProd1: document.getElementById("idProd1-hidden").value,
        idUsu1: document.getElementById("idUsu1-hidden").value,
        estatus: document.getElementById("estatus").value,
        fechaHora: new Date().toISOString(),
    };

    try {
        const respuesta = await axios.post(url, datos);
        console.log("Venta guardada:", respuesta.data);
        window.location.href = "http://localhost:3001/ventas/mostrar";
    } catch (error) {
        console.error(
            "Error al guardar la venta:",
            error.response ? error.response.data : error.message
        );
        alert("Hubo un error al guardar la venta. Verifica los datos e inténtalo nuevamente.");
    }
}

function SearchInput({ label, apiUrl, id }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    const handleSearch = async (e) => {
        setQuery(e.target.value);

        if (e.target.value.trim().length > 0) { 
            try {
                const response = await axios.get(`${apiUrl}?search=${e.target.value}`);
                setResults(response.data);
            } catch (error) {
                console.error(`Error al buscar en ${apiUrl}:`, error);
                setResults([]);
            }
        } else {
            setResults([]); 
        }
    };

    const handleSelect = (item) => {
        setSelectedId(item.id); 
        setQuery(item.nombre);
        setResults([]); 
    };

    return (
        <div className="mb-3 position-relative">
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                className="form-control"
                id={id}
                value={query}
                onChange={handleSearch}
                required
                type="text"
                placeholder={`Buscar ${label.toLowerCase()}...`}
            />
            <input type="hidden" id={`${id}-hidden`} value={selectedId} />
            {results.length > 0 && (
                <ul className="list-group position-absolute w-100">
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
        </div>
    );
}

export default function NuevaVenta() {
    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarVenta} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <center>
                            <h1>Nueva Venta</h1>
                        </center>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="cantidad" className="form-label">Cantidad</label>
                            <input
                                className="form-control"
                                id="cantidad"
                                required
                                type="number"
                                min="1"
                                placeholder="Ingrese la cantidad"
                            />
                        </div>
                        
                        <SearchInput
                            label="Producto"
                            apiUrl="http://localhost:3000/productos/mostrar"
                            id="idProd1"
                        />
                        <SearchInput
                            label="Usuario"
                            apiUrl="http://localhost:3000/usuarios/mostrar"
                            id="idUsu1"
                        />
                        <div className="mb-3">
                            <label htmlFor="estatus" className="form-label">Estatus</label>
                            <select className="form-control" id="estatus" required>
                                <option value="vendido">Vendido</option>
                            </select>
                        </div>
                    </div>
                    <div className="card-footer">
                        <center>
                            <button
                                type="submit"
                                className="btn btn-primary col-12"
                            >
                                Guardar Nueva Venta
                            </button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
