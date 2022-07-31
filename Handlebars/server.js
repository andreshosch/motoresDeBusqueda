const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const contenedor = require('../archivos')
const Archivos = new contenedor('../productos.json')


const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/Views/Layout",
});

app.engine("hbs", hbs.engine);
app.set('views', "./Views");
app.set("view engine", "hbs");

// ESCUCHANDO EN PUERTO 8080
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
});
server.on("error", error => console.log(`Error: ${error}`))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {

    res.render("main");
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