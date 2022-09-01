import { Router } from 'express';
import { check } from 'express-validator';

import { mealsGet, mealsPost,  mealsDelete, mealsGetById, mealsPutName, mealsPutDesc, mealsPutAvailability } from '../controllers/meals.controller.js'; 
import { mealsValidator } from '../helpers/db-validator.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJwt } from '../middlewares/validar-jwt.js';
import { validarNombreMeal } from '../middlewares/validar-nombre.js';
import { tieneRol } from '../middlewares/validar-roles.js';

const router = Router();


router.get('/', mealsGet );

router.get('/:id', [

    check('id', 'Tiene que ser un mongoId valido').isMongoId(),
    check('id').custom( mealsValidator ),
    validarCampos

], mealsGetById )


router.post('/',[
    validarJwt,
    tieneRol('ADMIN'), 
    check('name', 'Es necesario ingresar un nombre').notEmpty(),
    validarNombreMeal,
    check('desc', 'Es necesaria una descripción').notEmpty(),
    check('desc', 'La descripción debe tener al menos 5 caracteres y maximo 250').isLength({ min: 5, max: 250 }),
    validarCampos
], mealsPost )


router.put( '/putMealsName/:id', [
    validarJwt,
    tieneRol('ADMIN'),   
    check('id', 'Es necesario un mongoId valido').isMongoId(),
    check('id').custom( mealsValidator ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarNombreMeal,
    validarCampos
], mealsPutName )

router.put( '/putMealsDesc/:id', [
    validarJwt,
    tieneRol('ADMIN'),   
    check('id', 'Es necesario un mongoId valido').isMongoId(),
    check('id').custom( mealsValidator ),
    check('desc', 'Es necesaria una descripción').notEmpty(),
    check('desc', 'La descripción debe tener al menos 5 caracteres y maximo 250').isLength({ min: 5, max: 250 }),
    validarCampos
], mealsPutDesc )

router.put( '/putMealsAvailability/:id', [
    validarJwt,
    tieneRol('ADMIN'),   
    check('id', 'Es necesario un mongoId valido').isMongoId(),
    check('id').custom( mealsValidator ),
    validarCampos
], mealsPutAvailability )

router.delete('/:id', [
    validarJwt,
    tieneRol('ADMIN'),   
    check('id', 'Es necesario un mongoId valido').isMongoId(),
    check('id').custom( mealsValidator ),
    validarCampos
], mealsDelete )


export default router;