import express from 'express';
import { fetchPaises, fetchPaisByName, createPais, modifyPais, removePais } from '../Controllers/paisesController.js';
const router = express.Router();
// Ruta para obtener todos los países
router.get('/', fetchPaises);
// Ruta para obtener un país por su nombre
router.get('/:name', fetchPaisByName);
// Ruta para agregar un nuevo país
router.post('/', createPais);
// Ruta para actualizar un país por su ID
router.put('/:name', modifyPais);
// Ruta para eliminar un país por su ID
router.delete('/:name', removePais);
export default router;