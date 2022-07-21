import bcryptjs from 'bcryptjs';


import User from '../models/Users.model.js';


export const usersGet = async( req, res ) => {

    const { limit = 5, from = 0} = req.query;

    try {
    
        const [ total, users ] = await Promise.all( [
    
            User.countDocuments( { condition: true }),
            User.find( { condition: true }) .limit( Number( limit )) .skip( Number( from ) )
    

        ]);

        res.status( 200 ).json({ total, users })

    } catch (error) {
        

        res.status( 500 ).json( { msg: 'Hable con el administrador', error })

    }



}

export const userGetById = async( req, res ) => {

    const { id } = req.params;

    try {
        
        const user = await User.findById( id );

        if ( !user.condition ) {

            return res.statu( 404 ).json({ msg: 'El usuario que busca no se encuentra disponible '});

        }

        res.status( 200 ).json( user )


    } catch (error) {
        res.status( 500 ).json( { msg: 'Hable con el administrador e intentolo más tarde', error });
    }



}

export const usersPost = async( req, res ) => { 

    const { name, mail, password} = req.body;

    const  user = new User({ name, mail, password });

    
    try {
        
        
        const salt = bcryptjs.genSaltSync();
        
        user.password = bcryptjs.hashSync( password, salt);
    
        await user.save()
    
        res.status( 200 ).json(
            user
        )

        
    } catch (error) {
        
        res.status( 500 ).json( { msg: ' Hable con el admistrador o intentelo mas tarde'})

    }

}


export const usersPutName = async( req, res ) => {

    const { id } = req.params; 

    const { name } = req.body;

    const data = { name };

    try {
        
        const user = await User.findByIdAndUpdate( id, data, { new: true });

        res.status( 200 ).json( user)
        

    } catch (error) {
       res.status( 500 ).json( { msg: 'Hable con el admistrador o intentelo más tarde', error}) 
    }
    
}

export const usersPutMail = async( req, res ) => { 

    const { id } = req.params;
    
    const { mail } = req.body;

    const data = { mail }    
    
    try {
      
        const user = await User.findByIdAndUpdate( id, data, { new: true } )

        res.status( 200 ).json( user )

    } catch (error) {
       res.status( 500 ).json( { msg: 'Hable con el admistrador o intentelo más tarde', error}) 
    }
}

        
export const usersPutPassword = async( req, res ) => { 

    const { id } = req.params;

    const { password } = req.body; 
    let data = {};

    try {
      
        const salt = bcryptjs.genSaltSync();

        data.password = bcryptjs.hashSync( password, salt); 
        const user = await User.findByIdAndUpdate( id, data, { new: true } );

        res.status( 200 ).json( user );

    } catch (error) {
       res.status( 500 ).json( { msg: 'Hable con el admistrador o intentelo más tarde', error}) 
    }

}        

export const usersDelete = async( req, res ) => { 
    
    const { id } = req.params;

    try {
       
        const user = await User.findByIdAndUpdate( id, { condition: false }, { new: true })
        
        res.status( 200 ).json( user )

    } catch (error) {
        
       res.status( 500 ).json( { msg: 'Hable con el admistrador o intentelo más tarde', error}) 
    }

}