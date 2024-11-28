const Producto = require("../clases/Producto");
const {productosBD} = require("./conexion");


function validar(productos2) {
    var validado = false;
    if (productos2.nombre != undefined && productos2.stock != undefined && productos2.precio != undefined) {
        validado = true;
    }
    return validado;
}

async function mostrarProductos(search = "") {
    const productos = await productosBD.get();
    let productosValidos = [];
    
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        const productoDatos = producto1.getProducto;     

        if (validar(productoDatos)) {
            productosValidos.push(productoDatos);
        }
    });

    // Si se proporciona un término de búsqueda, filtrar los productos
    if (search) {
        const searchLower = search.toLowerCase();
        productosValidos = productosValidos.filter(producto =>
            producto.nombre.toLowerCase().includes(searchLower)
        );
    }

    return productosValidos;
}


async function nombresProductos() {
    const productos = await productosBD.get();
    const productosValidos = [];
    
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        const productos2 = producto1.getProducto;

        if (validar(productos2)) {
            productosValidos.push(productos2.nombre);
        }
    });
    
    return productosValidos;
}


async function buscarPorId(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    var productoValido = { error: true };
    if (validar(producto1.getProducto)) {
        productoValido = producto1.getProducto;
    }
    return productoValido;
}

async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    var productoValido = false;
    if (validar(producto1.getProducto)) {
        await productosBD.add(producto1.getProducto);
        productoValido = true;
    }
    return productoValido;
}

async function borrarProducto(id) {
    const producto = await buscarPorId(id);
    var borrado = false;
    if (producto.error != true) {
        await productosBD.doc(id).delete();
        borrado = true;
    }
    return borrado;
}

async function modificarProducto(id, data) {
    const productoExistente = await buscarPorId(id);
    let productoModificado = false;

    if (productoExistente.error !== true) {
        const producto1 = new Producto(data);

        
        if (validar(producto1.getProducto)) {
            await productosBD.doc(id).update(producto1.getProducto);
            productoModificado = true;
        }
    }

    return productoModificado;
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorId,
    modificarProducto ,
    nombresProductos
};
