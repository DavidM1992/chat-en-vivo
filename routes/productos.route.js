import express from 'express';
import productosController from '../controllers/productos.controller.js'; // ! importo la función de registro para usarla en las rutas de autenticación

const routerProductos = express.Router();

// ! ----------------------Rutas Productos

// ! ruta que nos muestra el dashboard de todos los productos (zona privada)
routerProductos.get('/productos', productosController.getAllProductos);
// ! ruta que nos muestra el dashboard de un solo producto (zona privada)
routerProductos.get('/productos/:id', productosController.getProductoById);

export default routerProductos; //  funcionalidad principal de este archivo, exportar el router para usarlo en server.js
