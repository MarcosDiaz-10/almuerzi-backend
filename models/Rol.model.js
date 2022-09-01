import pkg from 'mongoose';

const { Schema, model } = pkg;

const RolSchema = Schema({ 
    rol: { type: String, required: [ true, 'El rol es obligatorio']}
})


export default model( 'Rol', RolSchema )