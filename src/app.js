//** desafio 4 websocket */
// alumno : JAVIER LEZCANO 
// comision: 50045

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

//obtener el array de productos
const productManager = require("../src/controllers/productManager.js");
const productmanager = new productManager("./src/models/productos.json")


//abrir coneccion ,"connection" primer evento para escuchar
io.on("connection", async(socket) => {
    console.log("un cliente se conecto")
    

  socket.emit("productos", await productmanager.getProducts());

  socket.on("eliminarProducto", async(id) => {
       await productmanager.deleteProduct(id);

       io.socket.emit("productos", await productmanager.getProducts());
  })

  socket.on("agregarProducto", async(producto) => {
    await productmanager.addProduct(producto);
    io.socket.emit("productos", await productmanager.getProducts());
  })
})

