const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class SituacaoCandidatura extends Model { }

SituacaoCandidatura.init({
    // Campos específicos da tabela SituacaoCandidatura        
    DS_SITUACAO_CANDIDATURA: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: `Descrição da situação do registro da candidatura da candidata ou candidato. Pode assumir os valores: Apto (candidata ou candidato apto para ir para urna), Inapto (candidata ou candidato o inapto para ir para urna) e Cadastrado (registro de candidatura realizado, mas ainda não julgado)`
    }
    ,   
}, {
    sequelize,
    modelName: 'situacaoCandidatura',
    comment: "tabela das situacoes de candidatura existentes.",
    tableName: "situacaoCandidatura"
});

// Defina as associações


module.exports = SituacaoCandidatura;