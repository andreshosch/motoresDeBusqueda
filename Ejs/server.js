const express = require("express");
const app = express();
const contenedor = require('../archivos')
const Archivos = new contenedor('../productos.json')

app.set("view engine", "ejs");
app.set('views', "./Views");


// ESCUCHANDO EN PUERTO 8080
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
});
server.on("error", error => console.log(`Error: ${error}`))

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {

    res.render("index.html");
})

app.post("/", (req, res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    Archivos.save(req.body)
        .then((products) => res.json(products))
})

app.get("/productos", (req, res) => {

    Archivos.getAll()
        .then((products) => res.render("productos", { products }))
});