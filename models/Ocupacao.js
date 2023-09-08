const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize-config');

class Ocupacao extends Model { }

Ocupacao.init({
    DS_OCUPACAO: {
        type: DataTypes.STRING,
        comment: "descricao da ocupacao do candidato"
    },
    CATEGORIA: {
        type: DataTypes.STRING,
        comment: "categoria da ocupacao para agrupamento"
    }
    // Outros campos relevantes
}, {
    sequelize,
    modelName: 'Ocupacao',
});

module.exports = Ocupacao;