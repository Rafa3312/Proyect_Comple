var rutas = require("express").Router();
var { mostrarProductos,
     nuevoProducto,
      borrarProducto,
       buscarPorId,
        modificarProducto,
    nombresProductos } = require("../bd/productosBD");

    rutas.get("/mostrar", async (req, res) => {
        try {
            const productos = await mostrarProductos();
    
            // Si no se envía un término de búsqueda, retorna todos los productos
            if (!req.query.search) {
                return res.status(200).json(productos);
            }
    
            // Filtra los productos si se proporciona un término de búsqueda
            const search = req.query.search.toLowerCase();
            const productosFiltrados = productos.filter(producto => 
                producto.nombre.toLowerCase().includes(search)
            );
    
            // Retorna los productos filtrados
            res.status(200).json(productosFiltrados);
        } catch (error) {
            console.error("Error al mostrar productos:", error);
            res.status(500).json({ error: "Error al obtener los productos" });
        }
    });
    

rutas.get("/nombres", async (req, res) => {
    const productos = await nombresProductos();
    res.json(productos);
});

rutas.get("/buscar/:id", async (req, res) => {
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});

rutas.delete("/borrar/:id", async (req, res) => {
    var borrado = await borrarProducto(req.params.id);
    res.json(borrado);
});

rutas.post("/nuevo", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

rutas.put("/modificar/:id", async (req, res) => {
    const productoModificado = await modificarProducto(req.params.id, req.body);
    res.json(productoModificado);
});

module.exports = rutas;
