import { getPaises } from "../Models/paisesModel.js";

export function filterByClaveValor(req, res) {
  //query: ?menor=10  o ?mayor=10
  const q = req.query || {};
  let clave = "";
  let valorParam;
  if (Object.prototype.hasOwnProperty.call(q, "menor") && Object.prototype.hasOwnProperty.call(q, "mayor")) {
    return res.status(400).json({ message: "Proveer sólo 'menor' o 'mayor', no ambos." });
  }
  if (Object.prototype.hasOwnProperty.call(q, "menor")) {
    clave = "menor";
    valorParam = q.menor;
  } else if (Object.prototype.hasOwnProperty.call(q, "mayor")) {
    clave = "mayor";
    valorParam = q.mayor;
  } else {
    return res
      .status(400)
      .json({ message: "Sólo se acepta query params 'menor' o 'mayor' (ej: ?menor=10)" });
  }
  const paises = getPaises();
  if (!paises.length) {
    return res.status(404).json({ message: "No hay países disponibles." });
  }
  const valor = Number(valorParam);
  if (Number.isNaN(valor)) {
    return res.status(400).json({ message: "El valor debe ser numérico" });
  }
  let resultado = [];
  if (clave === "menor") {
    resultado = paises.filter((p) => (p.total || 0) < valor);
  } else if (clave === "mayor") {
    resultado = paises.filter((p) => (p.total || 0) >= valor);
  } else {
    return res.status(400).json({ message: "Clave inválida" });
  }
  if (!resultado.length) {
    return res.status(404).json({ message: "No se encontraron países con esos criterios." });
  }
  res.json(resultado);
}