"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function ModificarProducto({ params }) {
    const router = useRouter();
    const { id } = params;
    const [producto, setProducto] = useState({ nombre: '', precio: '', stock: '' });
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/productos/mostrar/${id}`)
            .then(response => {
                console.log(response.data);
                if (response.data) {
                    setProducto(response.data);
                }
                setCargando(false);
            })
            .catch(error => {
                console.error("Error al obtener producto:", error);
                setCargando(false);
            });
    }, [id]);

    const modificarProducto = async (e) => {
        e.preventDefault();
        const url = `http://localhost:3000/productos/modificar/${id}`;
        
        try {
            await axios.put(url, producto);
            router.push("/productos/mostrar");
        } catch (error) {
            console.error('Error al modificar el producto:', error.response ? error.response.data : error.message);
        }
    };

    if (cargando) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={modificarProducto} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <center><h1>Modificar Producto</h1></center>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Producto</label>
                            <input 
                                className="form-control" 
                                id="nombre" 
                                required 
                                type="text" 
                                value={producto.nombre} 
                                onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="precio" className="form-label">Precio</label>
                            <input 
                                className="form-control" 
                                id="precio" 
                                required 
                                type="number" 
                                step="0.01" 
                                value={producto.precio} 
                                onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock" className="form-label">Stock</label>
                            <input 
                                className="form-control" 
                                id="stock" 
                                required 
                                type="number" 
                                value={producto.stock} 
                                onChange={(e) => setProducto({ ...producto, stock: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <center>
                            <button className="btn btn-primary col-12" type="submit">Guardar Cambios</button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
