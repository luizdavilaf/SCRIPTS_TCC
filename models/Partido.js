const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class Partido extends Model { }

Partido.init({
    sigla: {
        field: "SG_PARTIDO",
        type: DataTypes.STRING,
        allowNull: false,
        comment: "sigla do partido"
    },
    nome: {
        field: "NM_PARTIDO",
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Nome do partido"
    },
    nome_atual: {
        field: "NOME_ATUAL",
        type: DataTypes.STRING,
        comment: "Nome atual do partido"
    },
    situacao_atual: {
        field: "SITUACAO_ATUAL",
        type: DataTypes.STRING,
        comment: "SITUACAO atual do partido, se for extinto, fusao, etc",        
    }
    // Outros campos relevantes
}, {
    sequelize,
    tableName: "partido",
    /* indexes: [
        // Exemplo de índice composto em nome e idade
        {
            name: 'SG_PARTIDO',
            fields: ['SG_PARTIDO'],
        },
    ], */
});

module.exports = Partido;