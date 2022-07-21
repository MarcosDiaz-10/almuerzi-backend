
import mongoose from "mongoose";

 export const connectDb = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN );
    

        console.log( 'CONEXION CON BASE DE DATOS EXITOSA!!!!!' );


    } catch (error) {
        
        console.log( error )

        throw new Error('Error en la conexion con la base de datos ');


    }

}

