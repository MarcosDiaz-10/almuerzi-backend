import Order from '../models/Orders.model.js';

export const getOrder = async( req, res ) => {

    const { limit = 5, from = 0 } = req.query;
    const date = req.dateUser;


    try {
    
        const [ total, orders ] = await Promise.all( [
    
            Order.countDocuments( { condition: true, date }),
            Order.find( { condition: true, date }) .limit( Number( limit ))
            .skip( Number( from ) )
            .populate( 'meal_id', 'name')
            .populate( 'user_id', 'name')
    

        ]);

        res.status( 200 ).json({ total, orders })

    } catch (error) {
        

        res.status(500).json( { msg: 'Hable con el admistrador',error })

    }

}

export const getOrdersById = async( req, res ) => {

    const { id } = req.params;

    try {
        
        const order = await Order.findById( id ).populate('meal_id',[ 'name', 'availability']).populate( 'user_id', 'name');

        if( !order.condition ){

            res.status( 400 ).json( {

                msg: 'La orden no existe'

            })

        }

        res.status( 200 ).json( order )

    } catch (error) {

        res.status( 500 ).json( { error })

    }

}

export const orderPost = async( req, res ) => {


    const { meal_id, user_id, date } = req.body;

    const data = { 

        meal_id,
        user_id,
        date

     };

     const order = new Order( data );

     try {
         

        await order.save()

        res.status(201).json( order )

     } catch (error) {
            res.status(500).json({ msg: error})
     }
}

export const ordersPut = async( req, res ) => {

    const { meal_id, date } = req.body;

    const {id} = req.params;

    let order = '';

    let data = {};

    try {
        
        if( !meal_id ){

            data.date = date
    
            order = await Order.findByIdAndUpdate( id , data , { new: true }).populate('meal_id', ['name', 'availability'])
    
            return res.status( 200 ).json( order )
    
        }

        data.meal_id = meal_id;
        data.date = date;

        order = await Order.findByIdAndUpdate( id, data, { new: true });

        res.status( 200 ).json( order )


    } catch (error) {
        res.status(500).json( { msg: 'Hable con el administrador', error })
    }


}

export const ordersDelete = async( req, res ) => {

    const { id } = req.params;


    try {

        const order = await Order.findByIdAndUpdate( id, {  condition: false  }, { new: true });

        res.status( 200 ).json( order );
        
    } catch ( error ) {
        
        res.status( 500 ).json( { msg: 'Hable con el administrador', error})

    }

}
