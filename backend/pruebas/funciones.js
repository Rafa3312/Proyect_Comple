function saludar(nombre) {
console.log("Hola..."+nombre);
}


var saludo=nombre=>{
console.log("hola "+nombre);
}
saludo("Miguel Angel");

var saludo2=(nombre1,nombre2)=>{
console.log("Hola "+nombre1+" y "+nombre2);
}
saludo2("Miguel","Angel");

var saludo3=(nombre1,nombre2)=>{
return "Hola "+nombre1+" y "+nombre2;
}
console.log(saludo3("Miguel","Hugo"));

var saludo4=nombre1=>"Hola "+nombre1;
console.log(saludo4("Durazno"));

var saludo5=function(){
    console.log("Hola con funcion anonima");
}
saludo5();

var saludo6=()=>{
    console.log("Estas en saludo6");
}

var saludo7=(nombre="anonimo", s)=>{
    console.log("Hola "+nombre);
    s();
}
saludo7("vivaldi", saludo6);
