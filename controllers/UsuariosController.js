const db = require("../config/database");
const UsuarioDTO = require("../DTO/UsuarioDTO");

const UsuariosController = {
  getUsuarios: (req, res) => {
    const query =
      "SELECT usr.*, crg.nom_cargo " +
      "FROM usuarios usr " +
      "INNER JOIN cargos crg ON crg.id_cargo = usr.id_cargo;";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao executar a consulta:", err);
        res.status(500).send("Erro interno do servidor");
        return;
      }

      // Mapeie os resultados do banco de dados para objetos UsuarioDTO
      const usuariosDTO = results.map((result) => {
        return new UsuarioDTO(
          result.id_usuario,
          result.nome,
          result.email,
          result.senha,
          result.telefone,
          result.endereco,
          result.per_comissao,
          result.num_pix,
          result.url_foto,
          result.id_empresa,
          result.id_cargo,
          result.nom_cargo
        );
      });

      // Envie os resultados mapeados como resposta
      res.json(usuariosDTO);
    });
  },
  getUsuariosByEmpresa: (req, res) => {
    const id_empresa = req.params.id_empresa;
    const query =
    " SELECT usr.*, crg.nom_cargo " +
    " FROM usuarios usr " +
    " INNER JOIN cargos crg ON crg.id_cargo = usr.id_cargo " +
    " WHERE usr.id_empresa = ?";
  
    db.query(query, [id_empresa], (err, results) => {
      if (err) {
        console.error("Erro ao executar a consulta:", err);
        res.status(500).send("Erro interno do servidor");
        return;
      }

      // Mapeie os resultados do banco de dados para objetos UsuarioDTO
      const usuariosDTO = results.map((result) => {
        return new UsuarioDTO(
          result.id_usuario,
          result.nome,
          result.email,
          result.senha,
          result.telefone,
          result.endereco,
          result.per_comissao,
          result.num_pix,
          result.url_foto,
          result.id_empresa,
          result.id_cargo,
          result.nom_cargo
        );
      });

      // Envie os resultados mapeados como resposta
      res.json(usuariosDTO);
    });
  },
};

module.exports = UsuariosController;
