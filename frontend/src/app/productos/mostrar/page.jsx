import BorrarProducto from "@/components/borrarProd";
import Link from "next/link";
import axios from "axios";

async function getProductos() {
    const url = "http://localhost:3000/productos/mostrar";
    const productos = await axios.get(url);
    return productos.data;
}

export default async function Productos() {
    const productos = await getProductos();
    return (
        <>
            <h1>Productos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Borrar</th>
                        <th>Modificar</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.stock}</td>
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
