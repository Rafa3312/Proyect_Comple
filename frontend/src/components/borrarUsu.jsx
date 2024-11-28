"use client";
import axios from "axios";
import Link from "next/link";

export default function BorrarUsuario({ id }) {
    async function borrar(event) {
        event.preventDefault(); // Previene la navegación

        const url = "http://localhost:3000/usuarios/borrar/" + id; // Agrega la barra diagonal
        try {
            const respuesta = await axios.delete(url);
            console.log(respuesta);
            window.location.replace("/usuarios/mostrar");
        } catch (error) {
            console.error('Error al borrar el usuario:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <Link href="#" onClick={borrar}>borrar</Link> // Cambia href a un valor válido como "#"
    );
}
