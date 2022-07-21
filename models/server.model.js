import express from "express";
import cors from "cors";

import { connectDb} from "../DB/config.js";

import userRoutes from "../routes/users.routes.js";
import orderRoutes from "../routes/orders.routes.js";
import mealsRoutes from "../routes/meals.routes.js";


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT || 8080 ; 
        this.paths = {
            users: '/api/users',
            meals: '/api/meals',
            orders: '/api/orders'
        }

        //Middlewares
        this.middlewares()

        //Rutas de la app
        this.routes()

        //Conexion con la base de datos
        this.connectionDB()

    }

    async connectionDB(){
        await connectDb();
    }


    middlewares(){

        //Body-parser
        
        this.app.use(express.urlencoded({extended:false}));
        this.app.use( express.json() );

        //Cors

        this.app.use( cors() )

        this.app.use( express.static( 'public' ))


    }

    routes(){

        this.app.use( this.paths.users, userRoutes )
        this.app.use( this.paths.meals, mealsRoutes )
        this.app.use( this.paths.orders, orderRoutes )
    }

    listen(){

        this.app.listen( this.port , () => {
            console.clear()
            console.log( `Servidor Corriendo en el puerto ${ this.port }`)
        })

    }

}


export default Server; 