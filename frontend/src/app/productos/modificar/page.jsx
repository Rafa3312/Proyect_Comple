"use client";

import { useRouter } from 'next/navigation';

export default function BuscarProducto() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = document.getElementById("id").value;
        
        if (id) {
            router.push(`/productos/modificar/${id}`);
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={handleSubmit} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <center><h1>Buscar Producto para Modificar</h1></center>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">ID del Producto</label>
                            <input className="form-control" id="id" required autoFocus type="text" />
                        </div>
                    </div>
                    <div className="card-footer">
                        <center>
                            <button className="btn btn-primary col-12" type="submit">Buscar Producto</button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
