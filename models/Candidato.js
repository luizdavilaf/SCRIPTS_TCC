const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize-config');

class Candidato extends Model { }

Candidato.init({
    NM_CANDIDATO: {
        type: DataTypes.STRING,
        comment: 'Nome do candidato',
    },
    DS_GÊNERO: {
        type: DataTypes.STRING,
        comment: 'genero do candidato',
    },
    SQ_CANDIDATO: {
        type: DataTypes.STRING,
        comment: `Número sequencial da candidata ou candidato, gerado internamente pelos sistemas eleitorais para cada eleição. Observações: 1) Este sequencial pode ser utilizado como chave para o cruzamento de dados. 2) Não é o número de campanha da candidata ou candidato`,
    },
    NR_CPF_CANDIDATO: {
        type: DataTypes.STRING,
        comment: "cpf do candidato"
    },
    NR_TITULO_ELEITORAL_CANDIDATO: {
        type: DataTypes.STRING,
        comment: "titulo de eleitor do candidato"
    }
    // Outros campos relevantes
}, {
    sequelize,
    modelName: 'Candidato',
    
});

module.exports = Candidato;