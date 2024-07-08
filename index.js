require("dotenv").config();
const express = require("express")
const server = express();
const path = require("path")
const librosRouter = require("./routers/libros.router")
const authRouter = require("./routers/auth.router")

server.use(express.static(path.join(__dirname, "public")));
server.use(express.json());



server.use("/libros", librosRouter);
server.use("/auth", authRouter)
server.use("/", (req, res) => res.send("Raiz del servidor /"))



const PORT = process.env.PORT || 3000
server.listen(PORT, console.log(`SERVIDOR ESCUCHANDO PUERTO ${PORT}`))