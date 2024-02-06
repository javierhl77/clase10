//** CLASE 10 - WEBSOCKETS */

const express = require("express");

const app = express();
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require ("./routes/carts.router.js");


const viewsRouter = require("./routes/views.router");

const socket = require("socket.io");

const PUERTO = 8080;
 const exphbs = require ("express-handlebars");

 //configurar handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//


//middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

//routing
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//guardar una referencia de express 
const httpServer = app.listen(PUERTO, () => {
    console.log(`escuchando en el puerto : ${PUERTO}` );
})

//pasos para trabajar con sockets.io
// 1) instalar socket.io : npm install socket.io
//2) importamos el modulo:  const socket = require("socket.io")
//configuramos:
const io = socket(httpServer);

// crear  array de usuarios
const usuarios = [
    {id:1, nombre: "lionel", apellido: "messi"},
    {id:2, nombre: "cristiano", apellido: "ronaldo"},
    {id:3, nombre: "pocho", apellido: "lavezzi"},
    {id:4, nombre: "raul", apellido: "carnota"},
]

//abrir coneccion 
io.on("connection", (socket) => {
    console.log("un cliente se conecto")
    socket.on("mensaje", (data) => {
        console.log(data);
    })

    //ahora el servidor envia un mensaje


    socket.emit("saludito", "holaaa!! cliente")

    //enviamos el array:
    socket.emit("usuarios",usuarios);
})