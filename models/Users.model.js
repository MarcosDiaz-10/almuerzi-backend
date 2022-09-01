import pkg from 'mongoose';
const { Schema, model } = pkg;

const usuarioSchema = Schema({

    name: { type: String, required: [ true, 'El nombre es necesario'] },

    mail: { type: String, required: [ true, 'El correo en necesario'], unique: true },

    password: { type: String, required: [ true, 'La contraseña es necesario'] },
    
    img: { type: String },
    
    rol: { type: String},

    condition: { type: Boolean, default: true }, 

    google: { type: Boolean, default: false },

    facebook: { type: Boolean, default: false }

    
})


usuarioSchema.methods.toJSON = function(){

    const { condition, google, facebook, __v, ...user } = this.toObject();

    return user ;


}

export default model( 'User', usuarioSchema )
