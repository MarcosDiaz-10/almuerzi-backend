import { Router } from 'express';
import { check } from 'express-validator';


import { validarCampos } from '../middlewares/validar-campos.js';
import { getOrder, orderPost, getOrdersById, ordersPut, ordersDelete } from '../controllers/orders.controller.js'
import { ordersValidator, usersValidator,mealsValidator } from '../helpers/db-validator.js'
import { validarFecha } from '../middlewares/validar-fecha.js';
import { validarJwt } from '../middlewares/validar-jwt.js';

const router = Router();

router.use( validarJwt );


router.get( '/', getOrder );

router.get('/:id', [

    check('id', 'Se necesita un mongoId').isMongoId(),
    check('id').custom( ordersValidator ),
    validarCampos

], getOrdersById )


router.post('/', [

    check( 'meals_id', 'Es necesario una comida para crear la orden').notEmpty(),
    check( 'meals_id').custom( mealsValidator ),
    validarFecha,
    validarCampos

], orderPost );

router.put('/:id', [ 
    check( 'id', 'No es un mongo id valido' ).isMongoId(),
    check( 'id' ).custom( ordersValidator ),
    validarFecha,
    validarCampos
], ordersPut )

router.delete( '/:id', [
    check( 'id', 'No es un mongo id valido' ).isMongoId(),
    check( 'id' ).custom( ordersValidator ),
    validarCampos    
], ordersDelete )

export default router