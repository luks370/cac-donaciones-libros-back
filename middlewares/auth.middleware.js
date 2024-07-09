const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    
    if(!authHeader){
        return res.status(403).json({error: "No se recibio el token!"})
    }

    const token = authHeader.split(" ")[1]

    if(!token){
        return res.status(403).json({error: "No se recibio el token!"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if(error){
            return res.status(500).json({auth: false, mensaje: "Token invalido!"})
        }
        
        req.usuario_id = decoded.usuario_id;

        next();
    })
}