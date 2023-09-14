const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class Cargo extends Model { }

Cargo.init({
    DS_CARGO: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Se cada cargo deve ser único
        comment: 'Descrição do cargo',
    },
}, {
    sequelize,    
    modelName: 'Cargo',    
    comment: 'Tabela que armazena informações sobre os cargos dos candidatos, criada para categorizar as profissoes',    
    tableName: "cargo"
});

module.exports = Cargo;