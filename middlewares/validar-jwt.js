import jwt from "jsonwebtoken";

import User from "../models/Users.model.js"

export const validarJwt = async( req, res, next ) => {

    const token = req.header('x-token'); 

    if(!token){

        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })

    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );


        const usuarioAutenticado = await User.findById( uid )

        if( !usuarioAutenticado ){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            })
        }



        if( !usuarioAutenticado.condition){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false' 
            })
        }



        req.usuarioAuth = usuarioAutenticado;

        next();

    } catch (error) {
        
        console.log( error )
        res.status(401).json({
            msg: 'El token no es valido'
        })

    }



}