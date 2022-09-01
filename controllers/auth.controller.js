import bcryptjs from 'bcryptjs';

import { generarJwt } from '../helpers/generar-jwt.js';
import User from "../models/Users.model.js";

export const login = async( req, res) => {

    const { password} = req.body;

    const mail = req.body.mail.toUpperCase();

    try {
        const user = await User.findOne( { mail, condition : true });
     
        if ( !user ){
          return res.status( 400 ).json({ msg: 'El correo o la contraseña son incorrectos - no existe user'});
        }
     
       const validarPassword = bcryptjs.compareSync( password, user.password);
     
       if( !validarPassword ) {
         return res.status( 400 ).json({ msg: 'El correo o la contraseña son incorrectos - password'})
       }
       
       const token = await generarJwt( user.id );
        
       res.json({user, token});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}