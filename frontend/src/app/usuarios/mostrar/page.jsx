import BorrarUsuario from "@/components/borrarUsu";
import Link from "next/link";
import axios from "axios";

async function getUsuarios(){
    const url="http://localhost:3000/usuarios/mostrar";
    const usuarios = await axios.get(url);
    return usuarios.data;
}

async function getSessionUsuario(params) {
    console.log("Estas en getUsuarios");
    const url="http://localhost:3000/usuarios/getSessionUsuario";
    const sesionValida=await axios.get(url);
    console.log(sesionValida.data);
}

export default async function Usuarios(){
    const usuarios = await getUsuarios();
    return (
        <>
            <h1>Usuarios</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Borrar</th>
                        <th>Modificar</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.usuario}</td> 
                                <td><BorrarUsuario id={usuario.id} /></td>
                                <td>
                                    <Link href={`/usuarios/modificar/${usuario.id}`} className="btn btn-primary">
                                        Modificar
                                    </Link>
                                    
                                </td> 
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <Link href={`/usuarios/nuevo/`} className="btn btn-primary">
                                        Nuevo
            </Link>
            </div>
            
        </>
    );
}
