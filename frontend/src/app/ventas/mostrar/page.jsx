import BorrarVenta from "@/components/borrarVent";
import Link from "next/link";
import axios from "axios";

async function getVentas() {
    const url = "http://localhost:3000/ventas/mostrar";
    const ventas = await axios.get(url);
    return ventas.data;
}

async function getUsuario() {
    const urlu = "http://localhost:3000/usuarios/mostrar";
    const usuarios = await axios.get(urlu);
    return usuarios.data;
}

async function getProducto() {
    const urlp = "http://localhost:3000/productos/mostrar";
    const productos = await axios.get(urlp);
    return productos.data;
}

export default async function Ventas() {
    const ventas = await getVentas();
    const usuarios = await getUsuario();
    const productos = await getProducto();
    const ventasVendidas = ventas.filter(venta => venta.estatus === "vendido");

    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Producto</th>
                        <th>Usuario</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Estatus</th>
                        <th>Borrar</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventasVendidas.map((venta, index) => {
                            const usuario = usuarios.find(u => u.id === venta.idUsu1);
                            const nombreUsuario = usuario ? usuario.nombre : "Desconocido";

                            const producto = productos.find(p => p.id === venta.idProd1);
                            const nombreProducto = producto ? producto.nombre : "Desconocido";
                            const precioProducto = producto ? producto.precio : "Desconocido";

                            return (
                                <tr key={venta.id}>
                                    <td>{index + 1}</td>
                                    <td>{venta.fechaHora}</td>
                                    <td>{nombreProducto}</td>
                                    <td>{nombreUsuario}</td>
                                    <td>{"$"+precioProducto}</td> 
                                    <td>{venta.cantidad}</td> 
                                    <td>{venta.estatus}</td> 
                                    <td><BorrarVenta id={venta.id} /></td>
                                    <td>
                                        <Link href={`/ventas/modificar/${venta.id}`} className="btn btn-primary">
                                            Modificar
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <div className="d-flex flex-column justify-content-center align-items-center">
                <Link href={`/ventas/nuevo/`} className="btn btn-primary">
                    Nuevo
                </Link>
            </div>
        </>
    );
}
