const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");
const Candidato = require('./Candidato');
const Eleicao = require('./Eleicao');
const Ocupacao = require('./Ocupacao');
const Cargo = require('./Cargo')
const Partido = require('./Partido')

class CandidatoEleicao extends Model { }

CandidatoEleicao.init({
    // Campos específicos da tabela CandidatoEleicao    
    SG_UF: {
        type: DataTypes.STRING,
        comment: "Sigla da Unidade da Federação em que ocorreu a eleição"
    }
    ,
    SG_UE: {
        type: DataTypes.STRING,
        comment: `Sigla da Unidade Eleitoral em que a candidata ou o candidato concorre na eleição. A Unidade Eleitoral representa a Unidade da Federação ou o Município em que a candidata ou o candidato concorre na eleição e é relacionada à abrangência territorial desta candidatura. Em caso de abrangência Federal (cargo de Presidente e VicePresidente) a sigla é BR. Em caso de abrangência Estadual (cargos de Governador, Vice-Governador, Senador, Deputado Federal, Deputado Estadual e Deputado Distrital) a sigla é a UF da candidatura. Em caso de abrangência Municipal (cargos de Prefeito, Vice-Prefeito e Vereador) é o código TSE de identificação do município da candidatura.`
    }
    ,
    DS_SITUACAO_CANDIDATURA: {
        type: DataTypes.STRING,
        comment: `Descrição da situação do registro da candidatura da candidata ou candidato. Pode assumir os valores: Apto (candidata ou candidato apto para ir para urna), Inapto (candidata ou candidato o inapto para ir para urna) e Cadastrado (registro de candidatura realizado, mas ainda não julgado)`
    }
    ,
    ST_REELEICAO: {
        type: DataTypes.STRING,
        comment: `Indica se a candidata ou candidato está concorrendo ou não à reeleição. Pode assumir os valores: S - Sim e N - Não.  Informação autodeclarada pela candidata ou candidato. Observação: Reeleição é a renovação do mandato para o mesmo cargo eletivo, por mais um período, na mesma circunscrição eleitoral na qual a representante ou o representante, no pleito imediatamente anterior, se elegeu. Pelo sistema eleitoral brasileiro, o presidente da República, os governadores de estado e os prefeitos podem ser reeleitos para um único período subsequente, o que se aplica também ao vice-presidente da República, aos vice-governadores e aos vice-prefeitos. Já os parlamentares (senadores, deputados federais e estaduais/distritais e vereadores) podem se reeleger ilimitadas vezes. A possibilidade da reeleição compreende algumas regras mais específicas detalhadas no sistema eleitoral brasileiro`
    }
    ,
    NR_IDADE_DATA_POSSE: {
        type: DataTypes.STRING,
        comment: `Idade da candidata ou candidato na data da posse. A idade é calculada com base na data da posse da referida candidata ou candidato para o cargo e unidade eleitoral constantes no arquivo de vagas.`
    }
    ,
    DS_COMPOSICAO_COLIGACAO: {
        type: DataTypes.STRING,
        comment: `Composição da coligação da qual a candidata ou candidato pertence. Observação: Coligação é a união de dois ou mais partidos a fim de disputarem eleições. A informação da coligação no arquivo está composta pela concatenação das siglas dos partidos intercarladas com o símbolo /`
    }
    ,
    DS_GRAU_INSTRUCAO: {
        type: DataTypes.STRING,
        comment: "Grau de instrução da candidata ou candidato."
    }
    ,
    DS_SIT_TOT_TURNO: {
        type: DataTypes.STRING,
        comment: "Descrição da situação de totalização da candidata ou candidato naquele turno."
    }
    ,
    NM_URNA_CANDIDATO: {
        type: DataTypes.STRING,
        comment: "Nome da candidata ou candidato que aparece na urna."
    }


}, {
    sequelize,
    modelName: 'CandidatoEleicao',
    comment: "tabela utilizada para relacionar as características do candidato em cada eleicao",
    tableName: "candidatoEleicao"
});

// Defina as associações


module.exports = CandidatoEleicao;