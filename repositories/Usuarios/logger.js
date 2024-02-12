const fs = require("fs").promises;
const path = require("path");

async function logQuery(query) {
  try {
    const now = new Date();
    const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const logDirectory = path.join(__dirname, "../logs");
    const logFilePath = path.join(logDirectory, "query.log");

    // Verifica se o diretório de logs existe, se não, cria-o
    await fs.mkdir(logDirectory, { recursive: true });

    const logMessage = `[${formattedDate}] - Executado SELECT: ${query}`;

    await fs.appendFile(logFilePath, logMessage);
    console.log("Log da consulta gravado com sucesso.");
  } catch (err) {
    console.error("Erro ao gravar o log da consulta:", err);
  }
}

module.exports = { logQuery };
