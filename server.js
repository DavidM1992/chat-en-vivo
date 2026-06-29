import express from 'express';
import 'dotenv/config';
import routerAuth from './routes/auth.route.js';
import routerProductos from './routes/productos.route.js';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';

// ! Variables | Constantes
const app = express();
const PORT = process.env.PORT || 8888;
const STRING_CONEXION = process.env.STRING_CONEXION;
const SECRET = process.env.SECRET;
const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);
//console.log(FILENAME);
//console.log(DIRNAME);
const mensajes = [
  { usuario: 'Pedro', mensaje: 'hola!, que tal?' },
  { usuario: 'Jorge', mensaje: 'bien, vos?' },
  { usuario: 'Norberto', mensaje: 'barbaro!' },
];

// ! Configuraciones

// * agrego libreria socket.io
const server = createServer(app);
const io = new Server(server);

// ! Middlewares
app.use(express.json()); // Me decodifica el body cuando llega a través de un json
app.use(express.static(path.join(DIRNAME, 'public')));
//console.log(path.join(DIRNAME, 'public'));

io.on('connection', (socket) => {
  console.log('un cliente conectado', socket.id);
  socket.on('disconnect', () => {
    console.log('un usuario se desconecto', socket.id);
  });

  const userId = socket.handshake.auth;
  console.log('Usuario:', userId, 'Socket:', socket.id);

  socket.emit('nombre', 'David');
  socket.emit('clientes', [
    { id: 1, nombre: 'David' },
    { id: 2, nombre: 'Luis' },
    { id: 3, nombre: 'maria' },
  ]);
  // recibiendo mensajes
  socket.on('is-active', (booleano) => {
    console.log(booleano);
  });

  socket.emit('mensajes', mensajes);

  socket.on('nuevo-mensaje', (nuevoMensaje) => {
    console.log(nuevoMensaje);
    mensajes.push(nuevoMensaje);
    console.log(mensajes);
    io.sockets.emit('mensajes', mensajes);
  });
});

// ! Rutas
app.use('/', routerAuth);
app.use('/', routerProductos);

app.get('/', (req, res) => {
  res.send('Página principal');
});

// ! Arranque de la app

server.listen(PORT, async () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
  try {
    console.time('Tiempo para conectarse a la DB');
    // await mongoose.connect(STRING_CONEXION);
    console.log('Conexión a DB establecidad correctamente');
    console.timeEnd('Tiempo para conectarse a la DB');
  } catch (error) {
    console.log('No se pudo conectar', error);
  }
});
