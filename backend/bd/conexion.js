const admin=require("firebase-admin");
const keys = require("../Keys.json")

admin.initializeApp({
    credential: admin.credential.cert(keys)
});

const bd=admin.firestore();
const usuariosBD=bd.collection("usuarios");
const productosBD=bd.collection("productos");
const ventasBD=bd.collection("ventas");

module.exports={
    usuariosBD,
    productosBD,
    ventasBD
}