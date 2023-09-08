const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize-config');

class Eleicao extends Model { }

Eleicao.init({
    ANO_ELEICAO: {
        type: DataTypes.INTEGER,
        comment: "ano da eleicao"
    },
    NR_TURNO: {
        type: DataTypes.INTEGER,
        comment: "turno da eleicao"
    }  
}, {
    sequelize,
    modelName: 'Eleicao',
});

module.exports = Eleicao;