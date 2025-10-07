import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import paisesRoutes from "./Routes/paisesRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({
    message:
      "1er parte del 2do parcial, API para alumno aleatorio. Encontraras las rutas en: /api-docs",
  });
});
app.use("/api/paises", paisesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});