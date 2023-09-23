const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class Raca extends Model { }

Raca.init({
    SG_Raca: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "raça do candidato"
    },    
    // Outros campos relevantes
}, {
    sequelize,
    modelName: 'Raca',
    tableName: "raca"
});

module.exports = Raca;