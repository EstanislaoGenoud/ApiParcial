import { validarPais } from "../Validators/paisValidator.js";

export function validatePaisData(req, res, next) {
  const resultado = validarPais(req.body);
  if (!resultado.valid) return res.status(400).json({ error: resultado.error });
  next();
}
