const { promisify } = require("util");
const db = require("../../config/database");
const { logQuery } = require("./logger");

class UsuariosRepository {
  constructor(db) {
    this.db = db;
  }

  async getByEmail(email) {
    try {
      const query = `SELECT * FROM usuarios WHERE email = ?`;
      // Executar a consulta para obter as informações do usuário
      const results = await promisify(db.query).bind(db)(query, [email]);
      logQuery(query, email);
      // Verificar se o usuário com o email fornecido existe
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsuariosRepository;
