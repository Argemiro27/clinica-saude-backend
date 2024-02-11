const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuarios = sequelize.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "email"
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    endereco: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    per_comissao: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    num_pix: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    url_foto: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'empresas',
            key: 'id_empresa'
        }
    },
    id_cargo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'cargos',
            key: 'id_cargo'
        }
    }
}, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "id_usuario" },
            ]
        },
        {
            name: "email",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "email" },
            ]
        },
        {
            name: "id_empresa",
            using: "BTREE",
            fields: [
                { name: "id_empresa" },
            ]
        },
        {
            name: "id_cargo",
            using: "BTREE",
            fields: [
                { name: "id_cargo" },
            ]
        },
    ]
});

module.exports = Usuarios;
