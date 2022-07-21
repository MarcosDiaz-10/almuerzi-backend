import pkg from 'mongoose';

const { Schema, model } = pkg; 

const orderSchema = Schema( {

    meal_id: { type: Schema.Types.ObjectId, ref: 'Meal', required: true },

    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true },

    date:{ type: String },

    condition: { type: Boolean , default: true }

})

orderSchema.methods.toJSON = function(){

    const { __v, ...order } = this.toObject();

    return order;


}

export default model( 'Order', orderSchema )
