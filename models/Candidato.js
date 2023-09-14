const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");


class Candidato extends Model { }

Candidato.init({
    NM_CANDIDATO: {
        type: DataTypes.STRING,
        comment: 'Nome do candidato',
    },
    DS_GENERO: {
        type: DataTypes.STRING,
        comment: 'genero do candidato',
    },
    SQ_CANDIDATO: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: `Número sequencial da candidata ou candidato, gerado internamente pelos sistemas eleitorais para cada eleição. Observações: 1) Este sequencial pode ser utilizado como chave para o cruzamento de dados. 2) Não é o número de campanha da candidata ou candidato`,
    },
    NR_CPF_CANDIDATO: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "cpf do candidato"
    },
    NR_TITULO_ELEITORAL_CANDIDATO: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "titulo de eleitor do candidato"
    },
    NM_MUNICIPIO_NASCIMENTO: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "municio de nascimento do candidato"
    },
    SG_UF_NASCIMENTO: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "estado de nascimento do candidato"
    },
    DS_COR_RACA: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "raça do candidato"
    }      
    // Outros campos relevantes
}, {
    sequelize,
    modelName: 'Candidato',
    tableName: "candidato"
    
});

module.exports = Candidato;