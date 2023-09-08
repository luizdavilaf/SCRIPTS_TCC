const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize-config');

class Partido extends Model { }

Partido.init({
    SG_PARTIDO: {
        type: DataTypes.STRING,
        comment: "sigla do partido"
    },
    NM_PARTIDO: {
        type: DataTypes.STRING,
        comment: "Nome do partido"
    },
    NOME_ATUAL: {
        type: DataTypes.STRING,
        comment: "Nome atual do partido"
    }
    // Outros campos relevantes
}, {
    sequelize,
    modelName: 'Partido',
});

module.exports = Partido;