var DataTypes = require("sequelize").DataTypes;
var _cargos = require("./cargos");
var _empresas = require("./empresas");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var cargos = _cargos(sequelize, DataTypes);
  var empresas = _empresas(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  usuarios.belongsTo(cargos, { as: "id_cargo_cargo", foreignKey: "id_cargo"});
  cargos.hasMany(usuarios, { as: "usuarios", foreignKey: "id_cargo"});
  usuarios.belongsTo(empresas, { as: "id_empresa_empresa", foreignKey: "id_empresa"});
  empresas.hasMany(usuarios, { as: "usuarios", foreignKey: "id_empresa"});

  return {
    cargos,
    empresas,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
