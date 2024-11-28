class Producto {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.stock = data.stock;
        this.precio = data.precio;
    }

    set id(id) {
        this._id = id;
    }
    
    set nombre(nombre) {
        const nombreRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/;
        if (nombreRegex.test(nombre)) {
            this._nombre = nombre;
        }
    }
    
    set stock(stock) {
        const stockRegex = /^\d+$/;  
        if (stockRegex.test(stock)) {
            this._stock = parseInt(stock, 10);
        }
    }
    
    set precio(precio) {
        const precioRegex = /^\d+(\.\d+)?$/;
        if (precioRegex.test(precio)) {
            this._precio = parseFloat(precio);
        }
    }
    
    get id() {
        return this._id;
    }
    
    get nombre() {
        return this._nombre;
    }
    
    get stock() {
        return this._stock;
    }
    
    get precio() {
        return this._precio;
    }
    
    get getProducto() {
        const conid = {
            id: this._id,
            nombre: this._nombre,
            stock: this._stock,
            precio: this._precio,
        }
        const sinid = {
            nombre: this._nombre,
            stock: this._stock,
            precio: this._precio,
        }
        return this.id != undefined ? conid : sinid;
    }
}

module.exports = Producto;
