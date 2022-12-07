import http from 'http';
import api from './api/api.js';
import database from './api/config/database.js';
import config from './api/config/index.js';

const port = config.server.port;
const server = http.createServer(api);

server.on('listening', ()=> {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
})

server.on('error', (err) => {
  console.error('Ha ocurrido un error en el server', err);
})

server.listen(port);

database();
