const Cargo = require('../models/cargos');

const CargosController = {
    getCargos: async (req, res) => {
        try {
            const cargos = await Cargo.findAll({
                attributes: ['id_cargo', 'nom_cargo']
            });
            res.json(cargos);
        } catch (error) {
            console.error('Erro ao buscar os cargos:', error);
            res.status(500).send('Erro interno do servidor');
        }
    }
};

module.exports = CargosController;
