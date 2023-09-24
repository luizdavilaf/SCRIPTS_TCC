const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class UnidadeEleitoral extends Model { }

UnidadeEleitoral.init({
    // Campos específicos da tabela UnidadeEleitoral        
    SG_UE: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: `Sigla da Unidade Eleitoral em que a candidata ou o candidato concorre na eleição. A Unidade Eleitoral representa a Unidade da Federação ou o Município em que a candidata ou o candidato concorre na eleição e é relacionada à abrangência territorial desta candidatura. Em caso de abrangência Federal (cargo de Presidente e VicePresidente) a sigla é BR. Em caso de abrangência Estadual (cargos de Governador, Vice-Governador, Senador, Deputado Federal, Deputado Estadual e Deputado Distrital) a sigla é a UF da candidatura. Em caso de abrangência Municipal (cargos de Prefeito, Vice-Prefeito e Vereador) é o código TSE de identificação do município da candidatura.`
    }
    ,
    TP_ABRANGENCIA: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: `Indica a abrangência da eleicao. Pode ser MUNICIPAL, ESTADUAL OU FEDERAL`  
    }   


}, {
    sequelize,
    comment: "tabela das unidades eleitorais existentes.",
    tableName: "unidadeEleitoral"
});

// Defina as associações


module.exports = UnidadeEleitoral;