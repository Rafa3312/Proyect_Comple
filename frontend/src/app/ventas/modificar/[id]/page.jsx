"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from "axios";
import SearchInput from '../../../../components/SearchInput'; 

export default function ModificarVenta({ params }) {
    const router = useRouter();
    const { id } = params;
    const [venta, setVenta] = useState({
        cantidad: '',
        fechaHora: '',
        idProd1: '', 
        idUsu1: '',  
    });

    useEffect(() => {
        const fechaActual = new Date();
        const fechaISO = fechaActual.toISOString().slice(0, 16); 

        axios.get(`http://localhost:3000/ventas/mostrar/${id}`)
            .then(response => setVenta({ ...response.data, fechaHora: fechaISO }))
            .catch(error => console.error("Error al obtener la venta:", error));
    }, [id]);

    const modificarVenta = async (e) => {
        e.preventDefault();
        const url = `http://localhost:3000/ventas/modificar/${id}`;
        
        const { estatus, ...ventaSinEstatus } = venta;

        try {
            await axios.put(url, ventaSinEstatus);
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error('Error al modificar la venta:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={modificarVenta} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <center><h1>Modificar Venta</h1></center>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="cantidad" className="form-label">Cantidad</label>
                            <input
                                className="form-control"
                                id="cantidad"
                                required
                                type="number"
                                value={venta.cantidad}
                                onChange={(e) => setVenta({ ...venta, cantidad: e.target.value })}
                            />
                        </div>

                        <SearchInput 
                            label="Producto"
                            apiUrl="http://localhost:3000/productos/mostrar"
                            id="idProd1"
                            selectedId={venta.idProd1}
                            setSelectedId={(id) => setVenta({ ...venta, idProd1: id })}
                        />

                        <SearchInput
                            label="Usuario"
                            apiUrl="http://localhost:3000/usuarios/mostrar"
                            id="idUsu1"
                            selectedId={venta.idUsu1}
                            setSelectedId={(id) => setVenta({ ...venta, idUsu1: id })}
                        />

                        <div className="mb-3">
                            <label htmlFor="fechaHora" className="form-label">Fecha</label>
                            <input
                                className="form-control"
                                id="fechaHora"
                                required
                                type="datetime-local"
                                value={venta.fechaHora}
                                onChange={(e) => setVenta({ ...venta, fechaHora: e.target.value })}
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
