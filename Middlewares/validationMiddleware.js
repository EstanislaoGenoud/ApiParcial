// MIDDLEWARE para validar los datos que enviaran por POST
export function validatePaisData(req, res, next) {
  const {
    pais,
    medallasOro,
    medallasPlata,
    medallasBronce,
    region,
    usoHorario,
  } = req.body;
  if (!pais || typeof pais !== "string") {
    return res
      .status(400)
      .json({
        error: "El campo 'pais' es obligatorio y debe ser una cadena de texto.",
      });
  }
  if (medallasOro !== undefined && typeof medallasOro !== "number") {
    return res
      .status(400)
      .json({ error: "El campo 'medallasOro' debe ser un número." });
  }
  if (medallasPlata !== undefined && typeof medallasPlata !== "number") {
    return res
      .status(400)
      .json({ error: "El campo 'medallasPlata' debe ser un número." });
  }
  if (medallasBronce !== undefined && typeof medallasBronce !== "number") {
    return res
      .status(400)
      .json({ error: "El campo 'medallasBronce' debe ser un número." });
  }
  if (region !== undefined && typeof region !== "string") {
    return res
      .status(400)
      .json({ error: "El campo 'region' debe ser una cadena de texto." });
  }
  if (usoHorario !== undefined && typeof usoHorario !== "string") {
    return res
      .status(400)
      .json({ error: "El campo 'usoHorario' debe ser una cadena de texto." });
  }
  next();
}
