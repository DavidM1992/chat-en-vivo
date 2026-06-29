import express from 'express';
const routerAuth = express.Router();
import authController from '../controllers/auth.controller.js'; // ! importo la función de registro para usarla en las rutas de autenticación

// ! ----------------------Rutas usuarios

// ! ruta donde recibo la info de logueo (usuario, correo, contraseña) y hago la validación
routerAuth.post('/login', authController.login);

// ! ruta donde recibo la info de registro (usuario, correo, contraseña) y hago la validación
routerAuth.post('/register', authController.register);

// ! ruta deslogueo de usuario
routerAuth.get('/logout', authController.logout);

export default routerAuth; // funcionalidad principal de este archivo, exportar el router para usarlo en server.js
