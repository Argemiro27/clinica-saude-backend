const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empresas = sequelize.define('empresas', {
    id_empresa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome_empresa: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    bd_empresa: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    cnpj: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'empresas',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "id_empresa" },
            ]
        },
    ]
});

module.exports = Empresas;
