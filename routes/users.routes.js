import { Router } from 'express';
import { check } from 'express-validator';


import { rolValidator, usersValidator } from '../helpers/db-validator.js';
import { usersGet, usersPost, userGetById, usersPutName, usersPutMail, usersPutPassword,usersPutRol, usersDelete } from '../controllers/users.controller.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import { mailValidator } from '../middlewares/validar-email.js'
import { validarNombreUser } from '../middlewares/validar-nombre.js';
import { validarJwt } from '../middlewares/validar-jwt.js';
import { tieneRol } from '../middlewares/validar-roles.js';

const router = Router();


router.get( '/', usersGet)

router.get( '/:id', [
    validarJwt,
    tieneRol('ADMIN'),
    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),
    validarCampos
], userGetById )

router.post( '/', [
    check( 'name', 'Es necesario un nombre' ).notEmpty(),
    check( 'mail', 'Es necesario un correo valido').isEmail(),
    mailValidator,
    check( 'password', 'La contraseña necesita al menos 6 caracteres').isLength( { min: 6 }),
    check('rol').custom(rolValidator),
    validarCampos

], usersPost )

router.put( '/putUserName/:id', [
    validarJwt,
    tieneRol('ADMIN', 'USER'),
    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),
    check( 'name', 'Es necesario un nombre' ).notEmpty(),
    validarCampos

], usersPutName )

router.put( '/putUserMail/:id', [
    validarJwt,
    tieneRol('ADMIN', 'USER'),
    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),
    check( 'mail', 'Es necesario un correo valido').isEmail(),
    mailValidator,
    validarCampos
], usersPutMail )

router.put( '/putUserPassword/:id', [
    validarJwt,
    tieneRol('ADMIN', 'USER'),  
    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),
    check( 'password', 'La contraseña necesita al menos 6 caracteres').isLength( { min: 6 }),
    validarCampos
], usersPutPassword )

router.put( '/putUserRol/:id', [
    validarJwt,
    tieneRol('ADMIN', 'USER'),
    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),
    check('rol').custom(rolValidator),
    validarCampos
], usersPutRol )

router.delete( '/:id', [
    validarJwt,
    tieneRol('ADMIN', 'USER'),
    check( 'id', 'Tiene que ser un mongo Id' ).isMongoId(),
    check( 'id').custom( usersValidator ),
    validarCampos
], usersDelete )


export default router;