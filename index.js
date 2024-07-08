const express = require("express")
const server = express();
const path = require("path")
const librosRouter = require("./routers/librosRouter")
const authRouter = require("./routers/authRouter")

// CARPETA PUBLICA
server.use(express.static(path.join(__dirname, "public")));

server.use(express.json());



server.use("/", (req, res) => res.send("index.js"))

server.use("/libros", librosRouter);

server.use("/auth", authRouter)

const PORT = process.env.PORT || 3001
server.listen(PORT, console.log(`SERVIDOR ESCUCHANDO PUERTO ${PORT}`))