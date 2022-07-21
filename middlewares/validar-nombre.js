
import Meal from '../models/Meals.model.js';

import User from '../models/Users.model.js'

export const validarNombreMeal = async( req, res, next ) => {

    const name = req.body.name.toUpperCase();

    const MealDb = await Meal.findOne({ name });

    if( MealDb ){

        return res.status(404).json({ msg: `El plato ${ name } ya existe`});

    }

    req.body.name = name;


    next();
}

export const validarNombreUser = async( req, res, next ) => {

    const name = req.body.name.toUpperCase();

    const userDb = await User.findOne( { name });

    if( userDb ){
        return res.status( 404 ).json( { msg: `El nombre: ${ name } ya existe`});
    }

    req.body.name = name

    next();
}
