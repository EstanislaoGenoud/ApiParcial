import {
  getPaises,
  getPaisesByName,
  getHusoHorarioConMasMedallas,
  addPais,
  getPaisesByRegion,
  updatePais,
  deletePais,
  getPaisById,
} from "../Models/paisesModel.js";
import { filterByClaveValor } from "../Services/MayorMenor.services.js";
// Controlador para obtener todos los países
export const fetchPaises = (req, res) => {
  const paises = getPaises();
  res.json(paises);
};

// Controlador para obtener un país por su nombre
export function fetchPaisByName(req, res) {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ message: "Se requiere el nombre del país" });
  }

  const pais = getPaisesByName(name);

  if (!pais) return res.status(404).json({ message: "País no encontrado" });

  res.json(pais);
}
// Controlador para obtener un país por su ID
export function fetchPaisById(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Se requiere el ID del país" });
  }
  const pais = getPaisById(id);
  if (!pais) return res.status(404).json({ message: "País no encontrado." });
  res.json(pais);
}

// Controlador para agregar un nuevo país
export function createPais(req, res) {
  try {
    const newPais = req.body;
    const createdPais = addPais(newPais);
    res
      .status(201)
      .json({ message: "País agregado correctamente", pais: createdPais });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
// Controlador para filtrar por region
export function fetchPaisesByRegion(req, res) {
  const { region } = req.query;
  if (!region) {
    return res
      .status(400)
      .json({ message: "Se requiere el nombre de la region" });
  }
  const resultado = getPaisesByRegion(region);
  if (!resultado.length) {
    return res
      .status(404)
      .json({ message: "Ningun pais encontrado para esa region" });
  }
  res.json(resultado);
}

// Controlador del filtrado por clave/valor a los servicios
export function fetchPaisesByMedallas(req, res) {
  return filterByClaveValor(req, res);
}
// Controlador para actualizar un país por su ID
export function modifyPais(req, res) {
  const id = Number(req.params.id);
  if (!id) return res.status(404).json({ error: "País no encontrado" });
  const updateData = req.body;
  const paisActualizado = updatePais(id, updateData);
  if (!paisActualizado)
    return res.status(404).json({ error: "País no encontrado" });
  res.json(paisActualizado);
}
// Controlador para eliminar un país por su ID
export const removePais = (req, res) => {
  const id = parseInt(req.params.id);
  const success = deletePais(id);
  if (success) {
    res.json({ message: "País eliminado", id });
  } else {
    res.status(404).json({ message: "País no encontrado" });
  }
};
// Controlador para obtener el uso horario con mayor medallas obtenidas
export function fetchZhTop(req, res) {
  const top = getHusoHorarioConMasMedallas();
  if (!top) return res.status(404).json({ error: "Sin datos" });
  res.json(top);
}
