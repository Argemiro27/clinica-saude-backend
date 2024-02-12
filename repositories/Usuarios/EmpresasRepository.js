const { promisify } = require("util");
const db = require("../../config/database");
const { logQuery } = require("./logger");

class EmpresasRepository {
  constructor(db) {
    this.db = db;
  }

  async getEmpresaById(id_empresa){
    return new Promise((resolve, reject) => {
      const query =
        "SELECT id_empresa, nome_empresa FROM empresas WHERE id_empresa = ?";
      logQuery(query);
  
      db.query(query, [id_empresa], (err, results) => {
        if (err) {
          console.error("Erro ao executar a consulta:", err);
          reject(err);
          return;
        }
  
        if (results.length === 0) {
          console.error("Nenhuma empresa encontrada com o ID fornecido");
          reject(new Error("Nenhuma empresa encontrada com o ID fornecido"));
          return;
        }
  
        resolve(results[0]); // Retorna apenas o primeiro resultado
      });
    });
  }
}

module.exports = EmpresasRepository;
