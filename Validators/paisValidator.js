const camposNumericos=['oro', 'plata','bronce','total'];
const camposString=['pais', 'region', 'usoHorario'];

export function validarPais(obj){
	if (!obj || typeof obj !== 'object') return { valid: false, error: 'Payload inválido' };
	if(typeof obj.pais !== 'string' || !obj.pais.trim()){
		return { valid: false, error: "El campo 'pais' es obligatorio y debe ser una cadena de texto." };
	}
	for (const key of camposNumericos) {
    if (obj[key] !== undefined && typeof obj[key] !== 'number') {
      return { valid: false, error: `El campo '${key}' debe ser un número.` };
    }
  }
	for (const key of camposString.slice(1)) { // saltamos pais que ya chequeamos
    if (obj[key] !== undefined && typeof obj[key] !== 'string') {
      return { valid: false, error: `El campo '${key}' debe ser una cadena de texto.` };
    }
  }
	return { valid:true };
}