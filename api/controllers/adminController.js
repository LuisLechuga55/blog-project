import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { Admin } from '../models/index.js';
import config from '../config/index.js';

const register = async (req, res) => {
  try {
    const encryptedPass = await bcrypt.hash(req.body.password, 10);
    req.body.password= encryptedPass;

    const newAdmin = await Admin.create(req.body)
    newAdmin.password = undefined;

    console.log('Admin registrado con éxito');

    res.json({
      message: 'Admin registrado',
      data: newAdmin,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        message: 'Credenciales incorrectas',
      });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({
        message: 'Credenciales incorrectas',
      });
    }

    const payload = {
      adminId: admin._id,
      nameAdmin: admin.name,
      lastNameAdmin: admin.lastName,
    }

    const token = jwt.encode(payload, config.token.secret);
    
    console.log('Inicio de sesión exitoso');

    return res.json({
      message: 'Inicio de sesión exitoso',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al iniciar sesión',
      error,
    });
  }
};

const getAllAdmin = async (_, res) => {
  try {
    const admin = await Admin.find({}, { password: 0 });

    console.log('Administradores obtenidos con éxito');

    return res.json({
      message: 'Administradores obtenidos con éxito',
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener los administradores',
      error,
    });
  }
};

export {
  register,
  login,
  getAllAdmin,
};
