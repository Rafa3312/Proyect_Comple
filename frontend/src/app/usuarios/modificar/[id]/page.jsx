"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function ModificarUsuario({ params }) {
    const router = useRouter();
    const { id } = params;
    const [usuario, setUsuario] = useState({ nombre: '', password: '', usuario: '' });

    useEffect(() => {
        axios.get(`http://localhost:3000/usuarios/mostrar/${id}`)
            .then(response => setUsuario(response.data))
            .catch(error => console.error("Error al obtener usuario:", error));
    }, [id]);

    const modificarUsuario = async (e) => {
        e.preventDefault();
        const url = `http://localhost:3000/usuarios/modificar/${id}`;
        
        try {
            await axios.put(url, usuario);
            router.push("/usuarios/mostrar");
        } catch (error) {
            console.error('Error al modificar el usuario:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={modificarUsuario} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <center><h1>Modificar Usuario</h1></center>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input 
                                className="form-control" 
                                id="nombre" 
                                required 
                                type="text" 
                                value={usuario.nombre} 
                                onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input 
                                className="form-control" 
                                id="password" 
                                required 
                                type="password" 
                                value={usuario.password} 
                                onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label">Usuario</label>
                            <input 
                                className="form-control" 
                                id="usuario" 
                                required 
                                type="text" 
                                value={usuario.usuario} 
                                onChange={(e) => setUsuario({ ...usuario, usuario: e.target.value })}
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
