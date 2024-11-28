    var rutas = require("express").Router();
    var { borrarVenta,mostrarVentas, nuevaVenta, buscarPorId, cancelarVenta, marcarComoVendida, modificarVenta } = require("../bd/ventasBD");


    rutas.get("/mostrar", async (req, res) => {
        const ventas = await mostrarVentas();
        res.json(ventas);
    });


    rutas.get("/buscar/:id", async (req, res) => {
        const venta = await buscarPorId(req.params.id);
        res.json(venta);
    });


    rutas.post("/nueva", async (req, res) => {
        const ventaValida = await nuevaVenta(req.body);  
        res.json({ ventaValida });
    });


    rutas.put("/cancelar/:id", async (req, res) => {
        const cancelada = await cancelarVenta(req.params.id);  
        res.json({ cancelada });
    });

    rutas.delete("/borrar/:id", async (req, res) => {
        var ventaCancelada = await borrarVenta(req.params.id);
        res.json(ventaCancelada);
    });


    rutas.put("/vendida/:id", async (req, res) => {
        const vendida = await marcarComoVendida(req.params.id);  
        res.json({ vendida });
    });


    rutas.put("/modificar/:id", async (req, res) => {
        const resultado = await modificarVenta(req.params.id, req.body);  
        res.json(resultado);
    });

    module.exports = rutas;
