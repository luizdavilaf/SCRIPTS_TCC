const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class Ocupacao extends Model { }

Ocupacao.init({
    nome_ocupacao: {
        field: "DS_OCUPACAO",
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true,
        comment: "descricao da ocupacao do candidato"
    },
    categoria: {
        type: DataTypes.STRING,
        unique: true,
        comment: "categoria da ocupacao para agrupamento",
        field: "CATEGORIA"
    }
    // Outros campos relevantes
}, {
    sequelize,
    tableName: "ocupacao"
});

module.exports = Ocupacao;