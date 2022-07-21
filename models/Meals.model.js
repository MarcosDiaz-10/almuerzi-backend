import pkg from 'mongoose';
const { Schema, model } = pkg;

const mealsSchema = Schema({

    name: { 
        type: String,
        required: [ true, 'El nombre es necesario']
    },

    desc: { 
        type:  String,  minLength: 5, maxLength: 250 
    },

    condition: { type: Boolean, default: true }, 

    availability: { type: Boolean, default: true},

    img: { type: String }

       
})

mealsSchema.methods.toJSON = function(){

    const { __v,condition, ...meal } = this.toObject();

    return meal;


}

export default model( 'Meal', mealsSchema )
