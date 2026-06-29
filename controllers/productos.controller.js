const getAllProductos = (req, res) => {
  res.send('Listado de productos');
};
const getProductoById = (req, res) => {
  res.send('Producto por ID');
};

export default { getAllProductos, getProductoById }; // ! exporto la función de registro para usarla en las rutas de autenticación
