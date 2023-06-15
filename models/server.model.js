import express from "express";
import cors from "cors";

import { connectDb} from "../DB/config.js";

import userRoutes from "../routes/users.routes.js";
import orderRoutes from "../routes/orders.routes.js";
import mealsRoutes from "../routes/meals.routes.js";
import authRoutes from "../routes/auth.routes.js"


const {pathname: root} = new URL('../', import.meta.url)
const __dirname = root.replace( /%20/g,' ').replace(/\\/g,'/').replace(/c:/g,'').replace('/', '')


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT ?? 0; 
        this.paths = {
            users: '/api/users',
            meals: '/api/meals',
            orders: '/api/orders',
            auth: '/api/auth'
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
        this.app.use( this.paths.auth, authRoutes )
        this.app.get('*', (req, res) => {
            console.log( __dirname + 'public/index.html')
            res.sendFile( 'public/index.html' , { root: '.' })
        })

    }

    listen(){

        this.app.listen( this.port , function () {
            console.clear()
            console.log( `Servidor Corriendo en el puerto  http://localhost:${ this.address().port }`)
        })

    }

}


export default Server; 
