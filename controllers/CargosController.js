
const db = require('../config/database');


const CargosController = {
    getCargos: (req, res) => {
        const query = 'SELECT id_cargo, nom_cargo FROM cargos';

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
  
  module.exports = CargosController;