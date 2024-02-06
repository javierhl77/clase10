
//**generamos una instancia socket.io del lado del cliente :*/
//console.log("holaa");
const socket = io();

//cuando quiero  enviar un msj al servidor

socket.emit( "mensaje", "hola mundo !!, te escribo del cliente");

//recibimos mensaje del servidor

socket.on("saludito", (data) => {
    console.log(data);
})
//r3cibimos el array usuarios

socket.on("usuarios", (data) => {
    console.log(data);

    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML="";
    
    data.forEach(usuario => {
        listaUsuarios.innerHTML += `<li>${usuario.nombre} - ${usuario.apellido}</li> `

    });
    

})
