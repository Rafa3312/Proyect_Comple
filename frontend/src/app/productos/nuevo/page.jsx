"use client"

import axios from "axios";

async function guardarProducto(e) {
    e.preventDefault();
    console.log("Estas en guardarProducto");
    const url = "http://localhost:3000/productos/nuevo";
    const datos = {
        nombre: document.getElementById("nombre").value,
        precio: parseFloat(document.getElementById("precio").value),
        stock: parseInt(document.getElementById("stock").value, 10)
    };

    try {
        const respuesta = await axios.post(url, datos);
        console.log("Producto guardado:", respuesta.data);
        window.location.href = "http://localhost:3001/productos/mostrar";
    } catch (error) {
        console.error("Error al guardar el producto:", error.response ? error.response.data : error.message);
    }
}

export default function NuevoProducto() {
    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarProducto} className="col-6 mt-5" action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <center><h1>Nuevo Producto</h1></center>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="producto" className="form-label">Nombre del Producto</label>
                            <input className="form-control" id="nombre" required autoFocus type="text" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="precio" className="form-label">Precio</label>
                            <input className="form-control" id="precio" required type="number" step="0.01" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock" className="form-label">Stock</label>
                            <input className="form-control" id="stock" required type="number" />
                        </div>
                    </div>
                    <div className="card-footer">
                        <center>
                            <button type="submit" className="btn btn-primary col-12">Guardar Nuevo Producto</button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
