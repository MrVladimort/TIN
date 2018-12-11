const express = require("express");
const bodyParser = require("body-parser");
const router = require("express-promise-router")();
const pug = require("pug");

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router.get("/hello", (req, res, next) => {
    res.status(200).send("Hello world!")
}));

app.use(router.get("/form", (req, res, next) => {
    res.render("form");
}));

app.use(router.post("/formdata", (req, res, next) => {
    const {wiek, imie, nazwisko} = req.body;

    res.render("formdata", {wiek, imie, nazwisko});
}));

app.use(router.post("/jsondata", (req, res, next) => {
    res.render("jsondata", {jsonObject: req.body});
}));

app.listen(8080);
