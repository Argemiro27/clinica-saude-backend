
const db = require('../config/database');


const EmpresasController = {
    getEmpresas: (req, res) => {
      const query = 'SELECT id_empresa, nome_empresa FROM empresas';
  
      db.query(query, (err, results) => {
          if (err) {
              console.error('Erro ao executar a consulta:', err);
              res.status(500).send('Erro interno do servidor');
              return;
          }
  
          res.json(results);
      });
    }
  };
  
  module.exports = EmpresasController;