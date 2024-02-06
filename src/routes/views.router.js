

const express = require("express");
const router = express.Router();
const productManager = require("../controllers/productManager");
const productmanager = new productManager("./src/models/productos.json")

router.get("/", async(req,res) => {
    try {
        const productos = await productmanager.getProducts();
        console.log(productos);
        res.render("home", {productos});
    } catch (error) {
        console.log("error al obtener los produuctos",error);
        res.status(500).json ({errors : "error interno del servidor"});
    }
});
router.get("/realtimeproducts", async(req,res) => {

     try {
        res.render("realtimeproducts");
     } catch (error) {
        console.log("error al obtener los produuctos",error);
        res.status(500).json ({errors : "error interno del servidor"});
     }

})

module.exports = router;