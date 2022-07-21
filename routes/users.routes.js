import { Router } from 'express';
import { check } from 'express-validator';


import { usersValidator } from '../helpers/db-validator.js';
import { usersGet, usersPost, userGetById, usersPutName, usersPutMail, usersPutPassword, usersDelete } from '../controllers/users.controller.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import { mailValidator } from '../middlewares/validar-email.js'
import { validarNombreUser } from '../middlewares/validar-nombre.js';

const router = Router();


router.get( '/', usersGet)

router.get( '/:id', [

    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),

], userGetById )

router.post( '/', [

    check( 'name', 'Es necesario un nombre' ).notEmpty(),
    check( 'mail', 'Es necesario un correo valido').isEmail(),
    mailValidator,
    check( 'password', 'La contraseña necesita al menos 6 caracteres').isLength( { min: 6 }),
    validarCampos

], usersPost )

router.put( '/putUserName/:id', [

    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),
    check( 'name', 'Es necesario un nombre' ).notEmpty(),
    validarCampos

], usersPutName )

router.put( '/putUserMail/:id', [
    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),
    check( 'mail', 'Es necesario un correo valido').isEmail(),
    mailValidator,
    validarCampos
], usersPutMail )

router.put( '/putUserPassword/:id', [
    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),
    check( 'password', 'La contraseña necesita al menos 6 caracteres').isLength( { min: 6 }),
    validarCampos
], usersPutPassword )

router.delete( '/:id', [
    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),
    validarCampos
], usersDelete )


export default router;