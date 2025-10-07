import {getPaises, getPaisesByName, addPais, updatePais, deletePais} from '../Models/paisesModel.js';
// Controlador para obtener todos los países
export const fetchPaises = (req, res) => {
  const paises = getPaises();
  res.json(paises);
};

// Controlador para obtener un país por su nombre
export function fetchPaisByName(req, res) {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ message: 'Se requiere el nombre del país' });
  }

  const pais = getPaisesByName(name);

  if (!pais) return res.status(404).json({ message: 'País no encontrado' });

  res.json(pais);
}
// Controlador para agregar un nuevo país
export function createPais(req, res) {
  try {
    const newPais = req.body;
    const createdPais = addPais(newPais);
    res.status(201).json({ message: 'País agregado correctamente', pais: createdPais });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
// Controlador para actualizar un país por su ID
export const modifyPais = (req, res) => {
  const pais = parseInt(req.params.pais);
  const updatedData = req.body;
  const updatedPais = updatePais(pais, updatedData);
  if (updatedPais) {
    res.json(updatedPais);
  } else {
    res.status(404).json({ message: "País no encontrado" });
  }
};
// Controlador para eliminar un país por su ID
export const removePais = (req, res) => {
  const pais = parseInt(req.params.pais);
  const success = deletePais(pais);
  if (success) {
    res.json({ message: "País eliminado" });
  } else {
    res.status(404).json({ message: "País no encontrado" });
  }
};
