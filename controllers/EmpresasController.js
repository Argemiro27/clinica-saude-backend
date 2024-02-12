const db = require("../config/database");
const { logQuery } = require("./logger");

const EmpresasController = {
  getEmpresas: (req, res) => {
    const query = "SELECT id_empresa, nome_empresa FROM empresas";
    logQuery(query);
    
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao executar a consulta:", err);
        res.status(500).send("Erro interno do servidor");
        return;
      }

      res.json(results);
    });
  },
  getEmpresaById: (req, res) => {
    const id_empresa = req.params.id_empresa;
    const query = "SELECT id_empresa, nome_empresa FROM empresas WHERE id_empresa = ?";
    logQuery(query);
    
    db.query(query, [id_empresa], (err, results) => {
      if (err) {
        console.error("Erro ao executar a consulta:", err);
        res.status(500).send("Erro interno do servidor");
        return;
      }

      if (results.length === 0) {
        console.error("Nenhuma empresa encontrada com o ID fornecido");
        res.status(404).send("Nenhuma empresa encontrada com o ID fornecido");
        return;
      }

      res.json(results);
    });
  }
};

module.exports = EmpresasController;
