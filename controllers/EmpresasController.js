const Empresas = require('../models/empresas'); // Importe o modelo 'empresas', não 'empresa'

const EmpresasController = {
    getEmpresas: async (req, res) => {
        try {
            const empresas = await Empresas.findAll({
                where: {}, // Adicione esta linha
                attributes: ['id_empresa', 'nome_empresa', 'bd_empresa', 'telefone', 'cnpj'] 
            });
            res.json(empresas);
        } catch (err) {
            console.error('Erro ao buscar empresas:', err);
            res.status(500).send('Erro interno do servidor');
        }
    }
};

module.exports = EmpresasController;