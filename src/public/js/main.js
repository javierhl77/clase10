
//**generamos una instancia socket.io del lado del cliente :*/
//console.log("holaa");
const socket = io();

//cuando quiero  enviar un msj al servidor

socket.emit( "mensaje", "hola mundo !!, te escribo del cliente");

//recibimos mensaje del servidor

socket.on("productos", (data) => {
    //console.log(data)
    renderProductos(data);
})

//funcion para renderizar los productos
const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.ForEach ( item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                        <p> ${item.id}</p>
                        <p> ${item.title}</p>
                        <p> ${item.price}</p>
                        <button> eliminar </button>
        `
        contenedorProductos.appendChild(card);
    })
}

    


