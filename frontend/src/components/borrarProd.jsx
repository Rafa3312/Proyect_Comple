"use client";
import axios from "axios";
import Link from "next/link";

export default function BorrarProducto({ id }) {
    async function borrar(event) {
        event.preventDefault(); // Previene la navegación

        const url = "http://localhost:3000/productos/borrar/" + id; // URL para borrar el producto
        try {
            const respuesta = await axios.delete(url);
            console.log(respuesta);
            window.location.replace("/productos/mostrar"); // Redirige a la página de productos
        } catch (error) {
            console.error('Error al borrar el producto:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <Link href="#" onClick={borrar}>borrar</Link> // Cambia href a un valor válido como "#"
    );
}
