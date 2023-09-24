const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class SituacaoTurno extends Model { }

SituacaoTurno.init({
    // Campos específicos da tabela SituacaoTurno        
    DS_SIT_TOT_TURNO: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Situação de totalização do candidato, naquele turno da eleição, após a totalização dos votos."
    }
    ,   
}, {
    sequelize,
    comment: "tabela das situacoes de turno existentes.",
    tableName: "situacaoTurno"
});

// Defina as associações


module.exports = SituacaoTurno;