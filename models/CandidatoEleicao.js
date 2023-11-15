const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize-connection");

class CandidatoEleicao extends Model { }

CandidatoEleicao.init({
    // Campos específicos da tabela CandidatoEleicao           
    situacao_reeleicao: {
        field: "ST_REELEICAO",
        type: DataTypes.BOOLEAN,
        comment: `Indica se a candidata ou candidato está concorrendo ou não à reeleição. Pode assumir os valores: S - Sim e N - Não.  Informação autodeclarada pela candidata ou candidato. Observação: Reeleição é a renovação do mandato para o mesmo cargo eletivo, por mais um período, na mesma circunscrição eleitoral na qual a representante ou o representante, no pleito imediatamente anterior, se elegeu. Pelo sistema eleitoral brasileiro, o presidente da República, os governadores de estado e os prefeitos podem ser reeleitos para um único período subsequente, o que se aplica também ao vice-presidente da República, aos vice-governadores e aos vice-prefeitos. Já os parlamentares (senadores, deputados federais e estaduais/distritais e vereadores) podem se reeleger ilimitadas vezes. A possibilidade da reeleição compreende algumas regras mais específicas detalhadas no sistema eleitoral brasileiro`
    },
    idade_data_da_posse: {
        field: "NR_IDADE_DATA_POSSE",
        type: DataTypes.INTEGER,
        comment: `Idade da candidata ou candidato na data da posse. A idade é calculada com base na data da posse da referida candidata ou candidato para o cargo e unidade eleitoral constantes no arquivo de vagas.`
    },
    coligacao: {
        type: DataTypes.STRING,
        field: "DS_COMPOSICAO_COLIGACAO",
        comment: `Composição da coligação da qual a candidata ou candidato pertence. Observação: Coligação é a união de dois ou mais partidos a fim de disputarem eleições. A informação da coligação no arquivo está composta pela concatenação das siglas dos partidos intercarladas com o símbolo /`
    },
    nome_urna_candidato: {
        field: "NM_URNA_CANDIDATO",
        type: DataTypes.STRING,
        comment: "Nome da candidata ou candidato que aparece na urna."
    },
    despesa_campanha: {
        field: "VR_DESPESA_MAX_CAMPANHA",
        type: DataTypes.DOUBLE,
        comment: "Valor máximo, em reais, de despesas de campanha declarada pelo partido para aquele candidato."
    }


}, {
    sequelize,
    comment: "tabela utilizada para relacionar as características do candidato em cada eleicao",
    tableName: "candidatoEleicao",    
    /* validate: {
        // Validação personalizada para garantir a unicidade de candidatoId e eleicaoId
        async uniqueCandidateElection() {
            if (this.isNewRecord || (this.changed('CandidatoId') || this.changed('EleicaoId'))) {
                const result = await CandidatoEleicao.findOne({
                    where: {
                        CandidatoId: this.CandidatoId,
                        EleicaoId: this.EleicaoId
                    }
                });
                if (result && (result.candidatoId === this.candidatoId) && (result.eleicaoId === this.eleicaoId) &&
                    (this.SituacaoCandidaturaId && result.SituacaoCandidaturaId && result.SituacaoCandidaturaId === this.SituacaoCandidaturaId)) {
                    console.log("result.candidatoId: ", result.candidatoId)                       
                    throw new Error('Já existe uma entrada com o mesmo candidatoId e eleicaoId.');
                }
            }
            
        }
    } */
});

// Defina as associações


module.exports = CandidatoEleicao;