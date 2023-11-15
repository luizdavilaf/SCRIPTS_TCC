const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class GrauDeInstrucao extends Model { }

GrauDeInstrucao.init({
    // Campos específicos da tabela GrauDeInstrucao        
    nome_instrucao: {
        field: "DS_GRAU_INSTRUCAO",
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Grau de instrução da candidata ou candidato na eleicao."
    }
    ,   
}, {
    sequelize,
    comment: "tabela graus de instrucao existentes.",
    tableName: "grauDeInstrucao"
});

// Defina as associações


module.exports = GrauDeInstrucao;