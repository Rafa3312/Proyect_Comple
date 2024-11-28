const {ventasBD}=require("./conexion"); 
const admin = require('firebase-admin'); 

const estatusPermitidos = ["pendiente", "vendido", "cancelado"];

function timestampToReadableDate(timestamp) {
    const date = new Date(timestamp._seconds * 1000); 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}



async function mostrarVentas() {
    const ventasSnapshot = await ventasBD.get();  
    const ventas = [];
    ventasSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.fechaHora && data.fechaHora._seconds) {
            data.fechaHora = timestampToReadableDate(data.fechaHora); 
        }
        ventas.push({ id: doc.id, ...data });
    });
    return ventas;
}


async function buscarPorId(id) {
    const ventaDoc = await ventasBD.doc(id).get();
    if (!ventaDoc.exists) {
        return null;  
    }
    
    const data = ventaDoc.data();
    if (data.fechaHora && data.fechaHora._seconds) {
        data.fechaHora = timestampToReadableDate(data.fechaHora); 
    }
    
    return { id: ventaDoc.id, ...data };
}


async function nuevaVenta(data) {

    const fechaHora = admin.firestore.Timestamp.now();  


    const venta = {
        cantidad: data.cantidad || 0, 
        idProd1: data.idProd1 || null, 
        idUsu1: data.idUsu1 || null, 
        estatus: data.estatus || "pendiente",  
        fechaHora: fechaHora  
    };


    if (!venta.idProd1 || !venta.idUsu1) {
        throw new Error("Los campos 'idProd1' y 'idUsu1' son obligatorios.");
    }

    const nuevaVentaRef = await ventasBD.add(venta);  
    return nuevaVentaRef.id;  
}


async function modificarVenta(id, data) {
    const venta = await buscarPorId(id);
    if (!venta) {
        return { error: "La venta no existe" };  
    }


    await ventasBD.doc(id).update({
        cantidad: data.cantidad || venta.cantidad,
        idProd1: data.idProd1 || venta.idProd1,
        idUsu1: data.idUsu1 || venta.idUsu1,
        estatus: data.estatus || venta.estatus,
        fechaHora: data.fechaHora ? admin.firestore.Timestamp.fromDate(new Date(data.fechaHora)) : venta.fechaHora
    });

    return { success: true, message: "Venta modificada con éxito." };
}


async function actualizarEstatus(id, nuevoEstatus) {
    if (!estatusPermitidos.includes(nuevoEstatus)) {
        return { error: "Estatus no permitido. Debe ser 'pendiente', 'vendido' o 'cancelado'." };
    }

    const venta = await buscarPorId(id);
    if (!venta) {
        return { error: "La venta no existe" };  
    }

    await ventasBD.doc(id).update({ estatus: nuevoEstatus });
    return { success: true, message: `Venta actualizada a '${nuevoEstatus}' con éxito.` };
}


async function cancelarVenta(id) {
    return await actualizarEstatus(id, "cancelado");
}

async function borrarVenta(id) {
    var ventaCancelada = false;
    const venta = await buscarPorId(id);  // Verificar si la venta existe

    if (venta != undefined) {
        console.log("Se cancelará la venta");
        await ventasBD.doc(id).update({ estatus: "cancelado" });
        ventaCancelada = true;
    }
    return ventaCancelada;
}


async function marcarComoVendida(id) {
    return await actualizarEstatus(id, "vendido");
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarPorId,
    cancelarVenta,
    marcarComoVendida,
    modificarVenta,
    borrarVenta  
};
