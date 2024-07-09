const express = require("express");
const router = express.Router();
const librosController = require("../controllers/libros.controller")
const upload = require("../multer/upload")


// Obtener todos los libros publicados
router.get("/", librosController.getAllLibros)
router.get("/:id", librosController.getLibroById)

// Publicar un libro nuevo
router.post("/", upload.single("imagen"), librosController.postLibro)

// Actualizar un libro publicado
router.put("/:id", librosController.putLibroById)

// Borrar un libro publicado
router.delete("/:id", librosController.deleteLibroById)


module.exports = router