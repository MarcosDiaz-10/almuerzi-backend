import jwt from "jsonwebtoken";



export const generarJwt = ( uid = '' ) => {

    return new Promise( (resolve, reject ) => {
        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, { expiresIn: '4h'}, ( err, token ) => {
            if( err ){
                console.log(err)
                reject('Fallo al generar JWT')
            } else{

                resolve(token)

            }
        });
    }) 

};