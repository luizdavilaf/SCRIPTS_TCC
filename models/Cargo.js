const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class Cargo extends Model { }

Cargo.init({
    nome_cargo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Se cada cargo deve ser único
        comment: 'Descrição do cargo',
        field: "DS_CARGO",
    },
}, {
    sequelize,        
    comment: 'Tabela que armazena informações sobre os cargos dos candidatos, criada para categorizar as profissoes',    
    tableName: "cargo"
});

module.exports = Cargo;