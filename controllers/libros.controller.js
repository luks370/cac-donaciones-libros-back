const db = require("../db/db")

const getAllLibros = (req, res) => {
    const query = `select * from libros`

    db.query(query, (error, rows) => {
        if(error){
            return res.status(500).json({error: "Intente mas tarde!!!"})
        }

        if(rows.length === 0){
            return res.status(200).json({exito: "No hay libros en la db!"})
        }

        res.status(200).json(rows)
    })
}

const postLibro = (req, res) => {
    const {titulo, descripcion, autor_id, categoria_id, estado, fecha_anadido, usuario_donador_id} = req.body;

    const query = `insert into libros (titulo, descripcion, autor_id, categoria_id, estado, fecha_anadido, usuario_donador_id) values (?, ?, ?, ?, ?, ?, ?)`

    const values = [titulo, descripcion, autor_id, categoria_id, estado, fecha_anadido, usuario_donador_id]

    db.query(query, values, (error, result) => {
        if(error){
            return res.status(500).json({error: "Intente mas tarde!!"})
        }
        const libro = {id: result.insertId, ...req.body}

        res.status(201).json(libro)
    } )
}

const putLibroById = (req, res) => {
    const {id} = req.params;
    const {titulo, descripcion, autor_id, categoria_id, estado, fecha_anadido, usuario_donador_id} = req.body;

    const query = `update libros set titulo=?, descripcion=?, autor_id=?, categoria_id=?, estado=?, fecha_anadido=?, usuario_donador_id=? where id=?`

    const values = [titulo, descripcion, autor_id, categoria_id, estado, fecha_anadido, usuario_donador_id, id]

    db.query(query, values, (error, result) => {
        if(error){
            return res.status(500).json({error: "Intente mas tarde!!"})
        }
        
        if(result.affectedRows === 0){
            return res.status(404).json({error: `El libro con Id: ${id} no existe!`})
        }

        const libro = {id, ...req.body}

        res.status(201).json(libro)
    })
}


const deleteLibroById = (req, res) => {
    const {id} = req.params;

    const query = `delete from libros where id=?`

    db.query(query, [id], (error, result) => {
        if(error){
            return res.status(500).json({error: "Intenta mas tarde"})
        }

        if(result.affectedRows === 0){
            console.log(result.affectedRows)
            return res.status(404).json({error: `El libro con Id: ${id} no existe!`})
        }

        res.status(200).json({exito: `Se elimino libro. Id: ${id}`})
    })
}


module.exports = {
    getAllLibros,
    postLibro,
    putLibroById,
    deleteLibroById
}