const express = require("express");
const router = express.Router();
const librosController = require("../controllers/libros.controller")


// Obtener todos los libros publicados
router.get("/", librosController.getAllLibros)

// Publicar un libro nuevo
router.post("/", librosController.postLibro)

// Actualizar un libro publicado
router.put("/:id", librosController.putLibroById)

// Borrar un libro publicado
router.delete("/:id", librosController.deleteLibroById)


module.exports = router