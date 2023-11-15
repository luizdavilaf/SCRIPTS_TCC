const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");


class Candidato extends Model { }

Candidato.init({
    nome: {
        type: DataTypes.STRING,
        comment: 'Nome do candidato',
        field: "NM_CANDIDATO",
    },    
    numero_sequencial: {
        type: DataTypes.STRING,
        field: "SQ_CANDIDATO",
        allowNull: false,
        comment: `Número sequencial da candidata ou candidato, gerado internamente pelos sistemas eleitorais para cada eleição. Observações: 1) Este sequencial pode ser utilizado como chave para o cruzamento de dados. 2) Não é o número de campanha da candidata ou candidato`,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "cpf do candidato",
        field: "NR_CPF_CANDIDATO"
    },
    titulo_eleitoral: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "titulo de eleitor do candidato",
        field: "NR_TITULO_ELEITORAL_CANDIDATO"
    },
    municipio_nascimento: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "municio de nascimento do candidato",
        field: "NM_MUNICIPIO_NASCIMENTO"
    },
    estado_nascimento: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "estado de nascimento do candidato",
        field: "SG_UF_NASCIMENTO"
    },  
    data_nascimento: {
        type: DataTypes.DATE,        
        comment: "DATA DE NASCIMENTO",
        field: "DT_NASCIMENTO"
    },     
    // Outros campos relevantes
}, {
    sequelize,    
    tableName: 'candidato',
    /* indexes: [
        // Exemplo de índice composto em nome e idade
        {
            name: 'NR_CPF_CANDIDATO',
            fields: ['NR_CPF_CANDIDATO'],
        },
        {
            name: 'NM_CANDIDATO',
            fields: ['NM_CANDIDATO'],
        },
    ], */
    
});

module.exports = Candidato;