import { Router } from 'express';
import { check } from 'express-validator';


import { validarCampos } from '../middlewares/validar-campos.js';
import { getOrder, orderPost, getOrdersById, ordersPut, ordersDelete } from '../controllers/orders.controller.js'
import { ordersValidator, usersValidator,mealsValidator } from '../helpers/db-validator.js'
import { validarFecha } from '../middlewares/validar-fecha.js';

const router = Router();


router.get( '/', validarFecha,getOrder );

router.get('/:id', [

    check('id', 'Se necesita un mongoId').isMongoId(),
    check('id').custom( ordersValidator ),
    validarCampos

], getOrdersById )


router.post('/', [

    check( 'meal_id', 'Es necesario una comida para crear la orden').notEmpty(),
    check( 'meal_id', 'No es un mongo id valido').isMongoId(),
    check( 'meal_id').custom( mealsValidator ),
    check( 'user_id', 'No es un mongo id valido').isMongoId(),
    check( 'user_id').custom( usersValidator ),
    check( 'date', 'Se necesita una fecha para crear la orden').isDate( { format: 'dd-mm-yyyy'}),
    validarCampos

], orderPost );

router.put('/:id', [ 
    check( 'id', 'No es un mongo id valido' ).isMongoId(),
    check( 'id' ).custom( ordersValidator ),
    check( 'date', 'Se necesita una fecha de actualizacion de la orden' ).isDate( { format: 'dd-m-yyyy'}),
    validarCampos
], ordersPut )

router.delete( '/:id', [
    check( 'id', 'No es un mongo id valido' ).isMongoId(),
    check( 'id' ).custom( ordersValidator ),
    validarCampos    
], ordersDelete )

export default router