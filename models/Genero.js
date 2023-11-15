const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class Genero extends Model { }

Genero.init({
    // Campos específicos da tabela Genero             
    nome_genero: {
        field: "DS_GENERO",
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'genero do candidato',
    },
}, {
    sequelize,
    comment: "tabela generos existentes.",
    tableName: "genero"
});



module.exports = Genero;