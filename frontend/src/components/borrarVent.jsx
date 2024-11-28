"use client";
import axios from "axios";
import Link from "next/link";

export default function BorrarVenta({ id }) {
    async function borrar(event) {
        event.preventDefault(); // Previene la navegación

        const url = "http://localhost:3000/ventas/borrar/" + id; // URL para borrar venta
        try {
            const respuesta = await axios.delete(url);
            console.log(respuesta);
            window.location.replace("/ventas/mostrar"); // Redirige a la página de mostrar ventas
        } catch (error) {
            console.error('Error al borrar la venta:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <Link href="#" onClick={borrar}>Cancelar venta</Link> // Cambia href a un valor válido como "#"
    );
}
