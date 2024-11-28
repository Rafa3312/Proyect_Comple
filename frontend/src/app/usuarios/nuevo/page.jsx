"use client"

import axios from "axios";

async function guardarUsuario(e){
    e.preventDefault();
    console.log("Estas en guardarUsuario");
    const url="http://localhost:3000/usuarios/nuevo";
    const datos={
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value

    }   

    const respuesta = await axios.post(url, datos);
    window.location.href="http://localhost:3001/usuarios/mostrar";

}
export default function NuevoUsuario() {
    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarUsuario} className="col-6 mt-5" action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <center><h1>Nuevo Usuario</h1></center>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                            <input className="form-control" id="nombre" required autoFocus type="text" autoComplete="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="usuario" className="form-label">Nombre de Usuario</label>
                            <input className="form-control" id="usuario" required type="text" autoComplete="username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input className="form-control" id="password" required type="password" autoComplete="new-password" />
                        </div>
                    </div>
                    <div className="card-footer">
                       <center>
                           <button typeof="submit" className="btn btn-primary col-12" type="submit">Guardar Nuevo Usuario</button>
                       </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
