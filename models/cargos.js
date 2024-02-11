const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cargos = sequelize.define('cargos', {
    id_cargo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nom_cargo: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'cargos',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "id_cargo" },
            ]
        },
    ]
});

module.exports = Cargos;
