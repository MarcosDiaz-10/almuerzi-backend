import { request, response } from "express"; 



export const tieneRol = ( ...roles ) => {

    return ( req = request, res = response, next ) => {
  
        if( !req.usuarioAuth){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar primero el token'
            })
        }
        if( !roles.includes(req.usuarioAuth.rol)){
            return res.status(401).json({
                msg: `Se requieren uno de estos roles: ${ roles }`
            })
        }

        next();

    }

}