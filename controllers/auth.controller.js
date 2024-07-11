const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("../db/db");

const registro = (req, res) => {
    const {nombre, apellido, dni, fecha_nac, email, contrasena, confirmado} = req.body;

    const hashedPass = bcrypt.hashSync(contrasena, 3);

    const query = `insert into usuarios (nombre, apellido, dni, fecha_nac, email, contrasena, confirmado) values (?,?,?,?,?,?,?)`
    const values = [nombre, apellido, dni, fecha_nac, email, hashedPass, confirmado]

    db.query(query, values, (error, result) => {
        if(error){
            return res.status(500).json({error: "Intenta mas tarde!"})
        }

        // quite la contraseña hash del objeto newUser, por recomendacion del profesor para mayor seguridad
        const newUser = {id: result.insertId, nombre, apellido, dni, email, confirmado}

        console.log("USUARIO REGISTRADO EXITOSAMENTE!")
        res.status(201).json(newUser)
    } )
}

const login = (req, res) => {
    const {email, contrasena} = req.body;

    const query = `select * from usuarios where email=?`

    db.query(query, [email], (error, result)=> {
        if(error){
            return res.status(500).json({error: "Intente mas tarde!"})
        }

        if(result.length === 0){
            return res.status(404).json({exito: `El email ${email} no esta registrado!!`})
        }

        const passValid = bcrypt.compareSync(contrasena, result[0].contrasena)

        if(!passValid){
            return res.status(401).json({auth: false, token: null})
        }

        const payload = {usuario_id: result[0].id}
        const secret = process.env.SECRET_KEY
        const options = {expiresIn: process.env.TOKEN_EXPIRES_IN}
        
        const token = jwt.sign(payload, secret, options)

        res.status(200).json({auth: true, token})

    })
}

module.exports = {
    registro,
    login
}