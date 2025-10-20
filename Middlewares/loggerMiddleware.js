import fs from "fs";

export function loggerMiddleware(req, res, next) {
  const line = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
  fs.appendFileSync("logs.txt", line);
  next();
}