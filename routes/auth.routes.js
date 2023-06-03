import { Router } from "express";
import { check } from 'express-validator';

import { login, renovarJWT } from "../controllers/auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJwt } from "../middlewares/validar-jwt.js";


const router = Router();

router.post('/login', [
    check( 'mail', 'Tiene que ser un correo electrónico').isEmail(),
    check(  'password', 'La contraseña debe tener al menos 6 caracteres' ).isLength( { min: 6 }),
    validarCampos
], login)

router.get('/', validarJwt, renovarJWT)

export default router;