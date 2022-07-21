
import Meal from '../models/Meals.model.js';
import Order from '../models/Orders.model.js';
import User from '../models/Users.model.js';



export const mealsValidator = async( id = '') => { 

    

    const existeMeal = await Meal.findById( id, { condition: true });

    if( !existeMeal ){

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



