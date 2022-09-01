import { Router } from "express";
import { check } from 'express-validator';

import { login } from "../controllers/auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

router.post('/login', [
    check( 'mail', 'Tiene que ser un correo electronico').isEmail(),
    check(  'password', 'La contraseña debe tener al menos 6 caracteres' ).isLength( { min: 6 }),
    validarCampos
], login)

export default router;