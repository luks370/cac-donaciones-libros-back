const db = require("../db/db")

const getAllLibros = (req, res) => {
    const query = `
    SELECT 
        l.id,
        l.titulo,
        l.descripcion, 
        CONCAT(a.nombre," ", a.apellido) AS autor, 
        c.nombre AS categoria, 
        l.estado, 
        DATE_FORMAT(l.fecha_anadido, '%Y-%m-%d') AS fecha_anadido,
        l.imagen, 
        concat(u.nombre," ", u.apellido)  AS usuario_donador
    FROM libros AS l
    INNER JOIN autores AS a ON a.id = l.autor_id
    INNER JOIN categorias AS c ON c.id = l.categoria_id
    INNER JOIN usuarios AS u ON u.id = l.usuario_donador_id;
    `;

    db.query(query, (error, rows) => {
        if(error){
            return res.status(500).json({error: "Intente mas tarde!!!"})
        }

        if(rows.length === 0){
            return res.status(200).json({exito: "No hay libros en la db!"})
        }

        console.log(`SE OBTUVO LOS DATOS DE TODOS LOS LIBROS`)
        res.status(200).json(rows)
    })
}

const getLibroById = (req, res) => {
    const {id} = req.params;

    const query = `
    SELECT
        l.id,
        l.titulo,
        l.descripcion, 
        CONCAT(a.nombre," ",a.apellido) AS autor, 
        c.nombre AS categoria, 
        l.estado,
        DATE_FORMAT(l.fecha_anadido, '%Y-%m-%d') AS fecha_anadido,
        l.imagen, 
        concat(u.nombre," ", u.apellido) AS usuario_donador
    FROM libros AS l
    INNER JOIN autores AS a ON a.id = l.autor_id
    INNER JOIN categorias AS c ON c.id = l.categoria_id
    INNER JOIN usuarios AS u ON u.id = l.usuario_donador_id
    WHERE l.id=?`;

    db.query(query, [id], (error, rows) => {
        if(error){
            return res.status(500).json({error: "Intente mas tarde!!!"})
        }

        if(rows.length === 0){
            return res.status(200).json({exito: `El libro no existe. Id: ${id}`})
        }

        console.log(`SE OBTUVO DATOS DEL LIBRO ID: ${id}`)
        res.status(200).json(rows[0])
    })
}

const postLibro = (req, res, decoded) => {
    const {titulo, descripcion, autor_id, categoria_id, estado, fecha_anadido} = req.body;
    const usuario_donador_id = req.usuario_id;
    const imagen = req.file.filename;

    const query = `INSERT INTO libros (titulo, descripcion, autor_id, categoria_id, estado, fecha_anadido, imagen, usuario_donador_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    const values = [titulo, descripcion, autor_id, categoria_id, estado, fecha_anadido, imagen, usuario_donador_id]

    db.query(query, values, (error, result) => {
        if(error){
            return res.status(500).json({error: "Intente mas tarde!!"})
        }
        const libro = {id: result.insertId, ...req.body}

        console.log(`SE AGREGO LIBRO ID: ${result.insertId}`)
        res.status(201).json(libro)
    } )
}

const putLibroById = (req, res) => {
    const {id} = req.params;
    const {titulo, descripcion, autor_id, categoria_id, estado, fecha_anadido} = req.body;
    const usuario_id = req.usuario_id;

    const query = `UPDATE libros SET titulo=?, descripcion=?, autor_id=?, categoria_id=?, estado=?, fecha_anadido=?, usuario_donador_id=? where id=? and usuario_donador_id=?`

    const values = [titulo, descripcion, autor_id, categoria_id, estado, fecha_anadido, usuario_id, id, usuario_id]

    db.query(query, values, (error, result) => {
        if(error){
            return res.status(500).json({error: "Intente mas tarde!!"})
        }
        
        if(result.affectedRows === 0){
            return res.status(404).json({error: `El libro con Id: ${id} no existe o no te pertenece!`})
        }
        
        const libro = {id, ...req.body}

        console.log(`SE ACTUALIZO LIBRO ID: ${id}`)
        res.status(201).json(libro)
    })
}

const deleteLibroById = (req, res) => {
    const {id} = req.params;
    const usuario_id = req.usuario_id

    const query = `DELETE FROM libros WHERE id=? and usuario_donador_id=?`

    db.query(query, [id, usuario_id], (error, result) => {
        if(error){
            return res.status(500).json({error: "Intenta mas tarde"})
        }

        if(result.affectedRows === 0){
            return res.status(404).json({error: `El libro con Id: ${id} no existe o no te pertenece!`})
        }

        console.log(`SE ELIMINO LIBRO ID: ${id}`)
        res.status(200).json({exito: `Se elimino libro. Id: ${id}`})
    })
}


module.exports = {
    getAllLibros,
    getLibroById,
    postLibro,
    putLibroById,
    deleteLibroById
}