const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class Partido extends Model { }

Partido.init({
    SG_PARTIDO: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "sigla do partido"
    },
    NM_PARTIDO: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Nome do partido"
    },
    NOME_ATUAL: {
        type: DataTypes.STRING,
        comment: "Nome atual do partido"
    },
    SITUACAO_ATUAL: {
        type: DataTypes.STRING,
        comment: "SITUACAO atual do partido, se for extinto, fusao, etc",        
    }
    // Outros campos relevantes
}, {
    sequelize,
    tableName: "partido"
});

module.exports = Partido;