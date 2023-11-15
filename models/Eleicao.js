const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class Eleicao extends Model { }

Eleicao.init({
    ano_eleicao: {
        field: "ANO_ELEICAO",
        type: DataTypes.INTEGER,
        allowNull: false, 
        comment: "ano da eleicao"
    },
    turno: {
        field: "NR_TURNO",
        type: DataTypes.INTEGER,
        allowNull: false, 
        comment: "turno da eleicao"
    }
}, {
    sequelize,
    primaryKey: ['ANO_ELEICAO', 'NR_TURNO'],     
    tableName: "eleicao"
});

module.exports = Eleicao;