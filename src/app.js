//** desafio 5 complementario */
// alumno : JAVIER LEZCANO 
// comision: 50045

const express = require("express");

const app = express();
const productsRouter = require("./routes/products.Router.js");
const cartsRouter = require ("./routes/carts.router.js");


const viewsRouter = require("./routes/views.router");

require("./database.js");

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
//const io = socket(httpServer);

//chat

const MessageModel = require("./models/message.model.js");
const io = new socket.Server(httpServer);

io.on("connection",  (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", async data => {

        //Guardo el mensaje en MongoDB: 
        await MessageModel.create(data);

        //Obtengo los mensajes de MongoDB y se los paso al cliente: 
        const messages = await MessageModel.find();
        console.log(messages);
        io.sockets.emit("message", messages);

    })
})

