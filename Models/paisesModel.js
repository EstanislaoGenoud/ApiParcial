import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configurar ruta absoluta al JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../Data/medallero.json");

// Leer y parsear JSON de manera segura
export function getPaises() {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    const paises = JSON.parse(data);
    if (!Array.isArray(paises)) return [];
    // Filtramos solo objetos válidos con propiedad 'pais'
    return paises.filter((p) => p && typeof p.pais === "string");
  } catch (err) {
    console.error("Error leyendo el JSON:", err);
    return [];
  }
}

// Obtener un país por nombre (case-insensitive)
export function getPaisesByName(name) {
  const paises = getPaises();
  return paises.find(
    (pais) => pais?.pais?.toLowerCase() === name.toLowerCase()
  );
}
// Agregar un nuevo país
// const dataPath = path.join(__dirname, "../Data/medallero.json");
export function addPais(newPais) {
  if (!newPais?.pais)
    throw new Error('El objeto debe tener la propiedad "pais"');
  const paises = getPaises();
  paises.push(newPais);
  fs.writeFileSync(dataPath, JSON.stringify(paises, null, 2));
  return newPais;
}

// Actualizar un país existente
export function updatePais(name, updatedData) {
  const paises = getPaises();

  // Buscamos el índice seguro
  const index = paises.findIndex(
    (pais) => pais?.pais?.toLowerCase() === name.toLowerCase()
  );

  if (index === -1) return null; // No encontró país

  // Aseguramos que no sobreescriba la propiedad 'pais' si no viene
  paises[index] = { ...paises[index], ...updatedData };

  fs.writeFileSync(dataPath, JSON.stringify(paises, null, 2));
  return paises[index];
}

// Eliminar un país por nombre
export function deletePais(name) {
  let paises = getPaises();
  const initialLength = paises.length;

  paises = paises.filter(
    (pais) => pais?.pais && pais.pais.toLowerCase() !== name.toLowerCase()
  );

  if (paises.length < initialLength) {
    fs.writeFileSync(dataPath, JSON.stringify(paises, null, 2));
    return true;
  }
  return false;
}
