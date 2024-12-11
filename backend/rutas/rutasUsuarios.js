var rutas = require("express").Router();

var { getSessionUsuario,
    getSessionAdmin,
    login,
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId,
    modificarUsuario,
    nombresUsuarios } = require("../bd/usuariosBD");

// Ruta para mostrar todos los usuarios o realizar búsqueda
rutas.get("/mostrar", async (req, res) => {
    try {
        const search = req.query.search || ""; // Obtener el término de búsqueda de la query string
        const usuarios = await mostrarUsuarios(search); // Pasamos el término de búsqueda

        // Retorna los usuarios que coinciden con el filtro
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al mostrar usuarios:", error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

// Ruta para obtener los nombres de usuarios
rutas.get("/nombres", async (req, res) => {
    const usuarios = await nombresUsuarios();
    res.json(usuarios);
});

// Ruta para buscar un usuario por su ID
rutas.get("/buscar/:id", async (req, res) => {
    var usuarioValido = await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

// Ruta para borrar un usuario por su ID
rutas.delete("/borrar/:id", async (req, res) => {
    var borrado = await borrarUsuario(req.params.id);
    res.json(borrado);
});

// Ruta para crear un nuevo usuario
rutas.post("/nuevo", async (req, res) => {
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

// Ruta para modificar un usuario por su ID
rutas.put("/modificar/:id", async (req, res) => {
    const id = req.params.id;
    const datosNuevos = req.body;
    const resultado = await modificarUsuario(id, datosNuevos);
    res.json(resultado);
});

// Ruta para login
rutas.post("/login", async (req, res) => {
    const usuarioCorrecto = await login(req, req.body.usuario, req.body.password);
    res.json(usuarioCorrecto);
});

// Ruta para obtener la sesión de un usuario
rutas.get("/getSessionUsuario", (req, res) => {
    var sesionValida = getSessionUsuario(req);
    res.json(sesionValida);
});

// Ruta para obtener la sesión de un admin
rutas.get("/getSessionAdmin", (req, res) => {
    res.json(getSessionUsuario(req));
});

module.exports = rutas;
