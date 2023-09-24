const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class Raca extends Model { }

Raca.init({
    DS_COR_RACA: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "raça do candidato"
    },    
    // Outros campos relevantes
}, {
    sequelize,
    tableName: "raca"
});

module.exports = Raca;