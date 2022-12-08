import express from 'express';
import { adminRoutes } from './routes/index.js';

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get('/api', (_, res) => {
  console.log('API funcionando');
  return res.json({
    msg: 'API funcionando',
  });
});

api.use('/admin', adminRoutes);

export default api;
