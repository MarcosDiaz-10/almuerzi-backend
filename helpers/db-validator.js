
import Meal from '../models/Meals.model.js';
import Order from '../models/Orders.model.js';
import User from '../models/Users.model.js';
import Rol from '../models/Rol.model.js'


export const mealsValidator = async( mealsId ) => { 

    

    const existeMeal = await Promise.all( mealsId.map(async (meal) => {
        return await Meal.findById( meal, { condition: true })
    })) ;


    if( existeMeal.includes(undefined)){

        throw new Error(`El plato que busca no se encuentra disponible`)

    }


}

export const ordersValidator = async( id = '') => {

    const existeOrder = await Order.findById( id, { condition: true });

    if( !existeOrder ) {

        throw new Error( 'La orden no se encuentra');

    }

}


export const usersValidator = async( id = '' ) => { 

    const existeUser = await User.findById( id, { condition: true });

    if( !existeUser ){

        throw new Error( 'No se encontro el usuario' )

    }

}

export const rolValidator = async( rol = '') => { 
    const existeRol = await Rol.findOne( { rol }); 

    if ( !existeRol ){
        throw new Error( 'No es un rol valido')
    }

}

