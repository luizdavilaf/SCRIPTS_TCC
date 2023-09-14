const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class Eleicao extends Model { }

Eleicao.init({
    ANO_ELEICAO: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        comment: "ano da eleicao"
    },
    NR_TURNO: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        comment: "turno da eleicao"
    }
}, {
    sequelize,
    modelName: 'Eleicao',
    primaryKey: ['ANO_ELEICAO', 'NR_TURNO'],     
    tableName: "eleicao"
});

module.exports = Eleicao;