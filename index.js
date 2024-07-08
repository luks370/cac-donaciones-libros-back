require("dotenv").config();
const express = require("express")
const server = express();
const path = require("path")
const librosRouter = require("./routers/libros.Router")
// const authRouter = require("./routers/authRouter")

// CARPETA PUBLICA
server.use(express.static(path.join(__dirname, "public")));

server.use(express.json());

server.use("/libros", librosRouter);
server.use("/", (req, res) => res.send("index.js"))

// server.use("/auth", authRouter)

const PORT = process.env.PORT || 3000
server.listen(PORT, console.log(`SERVIDOR ESCUCHANDO PUERTO ${PORT}`))