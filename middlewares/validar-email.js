import User from '../models/Users.model.js'

export const mailValidator = async( req, res, next ) => { 

    const mail = req.body.mail.toUpperCase();

    const existeMail = await User.findOne( {mail} );

    if( existeMail ){

        return res.status( 400 ).json( {
            msg: `El correo ${ mail } ya existe`
        })

    }

    req.body.mail = mail;

    next();

}

