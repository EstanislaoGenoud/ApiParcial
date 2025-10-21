import express from "express";
import {
  fetchPaises,
  fetchPaisByName,
  fetchPaisesByRegion,
  createPais,
  modifyPais,
  removePais,
  fetchPaisById,
  fetchZhTop,
} from "../Controllers/paisesController.js";
import {
  validatePaisData,
  validatePaisDataPut,
} from "../Middlewares/validationMiddleware.js";
const router = express.Router();
// Ruta para obtener todos los países
router.get("/", fetchPaises);
// Ruta para filtrar por region
router.get("/region", fetchPaisesByRegion);
// Ruta para obtener un país por su ID
router.get("/id/:id", fetchPaisById);
router.get(
  "/huso-horario/mas-medallas",
  (req, res, next) => {
    console.log("Llegó a la ruta /uso-horario/mas-medallas");
    next();
  },
  fetchZhTop
);
// Ruta para obtener un país por su nombre
router.get("/:name", fetchPaisByName);

// Ruta para agregar un nuevo país
router.post("/", validatePaisData, createPais);
// Ruta para actualizar un país por su ID
router.put("/:id", validatePaisDataPut, modifyPais);
// Ruta para eliminar un país por su ID
router.delete("/id/:id", removePais);
export default router;
