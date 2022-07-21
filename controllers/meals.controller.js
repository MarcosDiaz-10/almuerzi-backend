import Meal from '../models/Meals.model.js';

export const mealsGet = async( req, res) => {

  
        
        const { limit = 5, from = 0 } = req.query;
    
        const [ total, meals ] = await Promise.all([
    
            Meal.countDocuments( { condition: true }),
            Meal.find( {condition: true } )   .skip( Number( from ) ) .limit( Number( limit ) )
    
        ]) 
    
        res.status( 200 ).json({ total, meals });

   


}

export const mealsGetById = async( req, res ) => {

    const { id } = req.params;

    try {
        
        const meal = await Meal.findById( id );

        if( !meal.condition ){
            return res.status( 400 ).json({
                msg: 'El plato que busca no existe'
            })
        }
    

        res.status( 200 ).json( meal );

    } catch (error) {
        
        res.status( 500 ).json( { error })

    }

}

export const mealsPost = async( req, res ) => {

    try {
        
        const { name, desc } = req.body;
    
        const meal = new Meal( { name, desc });
    
        await meal.save();
    
        res.json({
            meal 
        })

    } catch (error) {
    
        res.status( 500 ).json( { error, msg: 'Hable con el admistrador' } )

    }

}

export const mealsPutName = async( req, res ) => {

    const { id } = req.params; 

    const { name } = req.body;

    try {
        
        const meal = await Meal.findByIdAndUpdate( id, { name }, { new: true })


        res.status( 200 ).json( meal )

    } catch (error) {
        
        res.status( 500 ).json( { msg: 'Hable con el admistrador', error })

    }


} 

export const mealsPutDesc = async( req, res ) => {

    const { id } = req.params; 

    const { desc } = req.body;

    try {
        
        const meal = await Meal.findByIdAndUpdate( id, { desc }, { new: true })


        res.status( 200 ).json( meal )

    } catch (error) {
        
        res.status( 500 ).json( { msg: 'Hable con el admistrador', error })

    }


} 

export const mealsPutAvailability = async( req, res ) => {

    const { id } = req.params; 

    const { availability = false } = req.body;

    try {
        
        const meal = await Meal.findByIdAndUpdate( id, { availability }, { new: true })


        res.status( 200 ).json( meal )

    } catch (error) {
        
        res.status( 500 ).json( { msg: 'Hable con el admistrador', error })

    }


}

export const mealsDelete = async( req, res ) => {

    const { id } = req.params;


    try {
        
        const meal = await Meal.findByIdAndUpdate( id, { condition: false })

        res.json( meal )

    } catch (error) {
        res.status( 500 ).json( { msg: 'Hable con el administrador', error } );
    }



}


