const sync = require('./models/sync')
const db = require('./db/dbconnection');
const sequelize = require("./db/sequelize-connection");


const fs = require('fs');
const csvParser = require('csv-parser');
const { Sequelize } = require("sequelize");
const moment = require('moment');



const Candidato = require('./models/Candidato');
const Partido = require('./models/Partido');
const Cargo = require('./models/Cargo');
const Eleicao = require('./models/Eleicao');
const Ocupacao = require('./models/Ocupacao');
const CandidatoEleicao = require('./models/CandidatoEleicao');
const UnidadeEleitoral = require('./models/UnidadeEleitoral');
const GrauDeInstrucao = require('./models/GrauDeInstrucao');
const SituacaoCandidatura = require('./models/SituacaoCandidatura');
const SituacaoTurno = require('./models/SituacaoTurno');
const Raca = require('./models/Raca');
const Genero = require('./models/Genero');


// Caminho para o arquivo CSV
const csvFilePath = 'E:\\repos\\SCRIPTS_TCC\\csvs\\consulta_cand_2022_BRASIL.csv';
const linhas = []

 const readCsv = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath, 'latin1')
            .pipe(csvParser({ separator: ';' }))
            .on('data', async (row) => {                
                const linha = {
                    NM_MUNICIPIO_NASCIMENTO: row.NM_MUNICIPIO_NASCIMENTO,
                    SG_UF_NASCIMENTO: row.SG_UF_NASCIMENTO,
                    NM_CANDIDATO: row.NM_CANDIDATO,
                    DS_GENERO: row.DS_GENERO,
                    SQ_CANDIDATO: row.SQ_CANDIDATO,
                    NR_CPF_CANDIDATO: row.NR_CPF_CANDIDATO,
                    NR_TITULO_ELEITORAL_CANDIDATO: row.NR_TITULO_ELEITORAL_CANDIDATO,
                    SG_PARTIDO: row.SG_PARTIDO,
                    NM_PARTIDO: row.NM_PARTIDO,
                    DS_CARGO: row.DS_CARGO,
                    ANO_ELEICAO: row.ANO_ELEICAO,
                    NR_TURNO: row.NR_TURNO,
                    DS_OCUPACAO: row.DS_OCUPACAO,
                    SG_UF: row.SG_UF,
                    SG_UE: row.SG_UE,
                    NM_UE: row.NM_UE,
                    TP_ABRANGENCIA: row.TP_ABRANGENCIA,
                    DS_SITUACAO_CANDIDATURA: row.DS_SITUACAO_CANDIDATURA,
                    ST_REELEICAO: row.ST_REELEICAO,
                    NR_IDADE_DATA_POSSE: row.NR_IDADE_DATA_POSSE,
                    DS_COMPOSICAO_COLIGACAO: row.DS_COMPOSICAO_COLIGACAO,
                    DS_GRAU_INSTRUCAO: row.DS_GRAU_INSTRUCAO,
                    DS_SIT_TOT_TURNO: row.DS_SIT_TOT_TURNO,
                    NM_URNA_CANDIDATO: row.NM_URNA_CANDIDATO,
                    DS_COR_RACA: row.DS_COR_RACA,
                    VR_DESPESA_MAX_CAMPANHA: row.VR_DESPESA_MAX_CAMPANHA,
                    DT_NASCIMENTO: row.DT_NASCIMENTO,
                }
                linhas.push(linha)
            })
            .on('end', () => {
                console.log("CSV Processado!")
                resolve(linhas)
            });
    })
}

   (async () => {
    try {
        const rows = await readCsv()//.then(async (rows) => {

        let contador = 0
        //for (let i = 0; i < rows.length; i++) {
        const batchSize = 2500;

        for (let i = 0; i < rows.length; i += batchSize) {
            const batch = rows.slice(i, i + batchSize);
            const promises = batch.map(async (row) => {
                //const row = rows[i];
                // Insira os dados do CSV no modelo            
                let existingCandidato = null;
                contador++
                //console.log(rows.length - contador)

                //console.log(rows.length - i)
                if (row.NR_CPF_CANDIDATO !== '-1' && row.NR_CPF_CANDIDATO !== '00000000000' && row.NR_CPF_CANDIDATO !== '-4' && row.NR_CPF_CANDIDATO !== '99999999999') {
                    existingCandidato = await Candidato.findOne({
                        where: {
                            cpf: row.NR_CPF_CANDIDATO,
                        },
                    });
                } else if (row.NR_TITULO_ELEITORAL_CANDIDATO !== '-1' && row.NR_TITULO_ELEITORAL_CANDIDATO !== '-4' && row.NR_TITULO_ELEITORAL_CANDIDATO !== '0') {
                    existingCandidato = await Candidato.findOne({
                        where: {
                            titulo_eleitoral: row.NR_TITULO_ELEITORAL_CANDIDATO,
                        },
                    });
                } else if (row.SQ_CANDIDATO !== '-1') {
                    //ver uma validacao com um dos outros campos
                    //dt nascimento, naturalidade, etc
                    existingCandidato = await Candidato.findOne({
                        where: {
                            numero_sequencial: row.SQ_CANDIDATO,
                        },
                    });
                }

                let existingGenero = await Genero.findOne({
                    where: {
                        nome_genero: row.DS_GENERO,
                    },
                });

                if (!existingGenero) {
                    existingGenero = await Genero.create({
                        nome_genero: row.DS_GENERO,
                    });
                }

                let existingRaca = null;
                if (row.DS_COR_RACA && row.DS_COR_RACA !== "#NE" && row.DS_COR_RACA !== "#NE#") {
                    existingRaca = await Raca.findOne({
                        where: {
                            nome: row.DS_COR_RACA,
                        },
                    });
                    if (!existingRaca) {
                        existingRaca = await Raca.create({
                            nome: row.DS_COR_RACA,
                        });
                    }
                }

                if (!existingCandidato) {
                    existingCandidato = await Candidato.create({
                        nome: row.NM_CANDIDATO,
                        numero_sequencial: row.SQ_CANDIDATO,
                        cpf: row.NR_CPF_CANDIDATO,
                        titulo_eleitoral: row.NR_TITULO_ELEITORAL_CANDIDATO,
                        municipio_nascimento: row.NM_MUNICIPIO_NASCIMENTO,
                        estado_nascimento: row.SG_UF_NASCIMENTO,
                        data_nascimento: moment(row.DT_NASCIMENTO, 'DD/MM/YYYY').isValid() ? moment(row.DT_NASCIMENTO, 'DD/MM/YYYY').toDate() : null
                    });
                }
                if (existingRaca && existingCandidato && (!existingCandidato.Raca || existingCandidato.Raca == "#NE")) {
                    await existingCandidato.setRaca(existingRaca)
                }
                await existingCandidato.setGenero(existingGenero)

                let existingPartido = await Partido.findOne({
                    where: {
                        sigla: row.SG_PARTIDO,
                    },
                });

                if (!existingPartido) {
                    existingPartido = await Partido.create({
                        sigla: row.SG_PARTIDO,
                        nome: row.NM_PARTIDO,
                    });
                }

                let existingCargo = await Cargo.findOne({
                    where: {
                        nome_cargo: row.DS_CARGO,
                    },
                });

                if (!existingCargo) {
                    existingCargo = await Cargo.create({
                        nome_cargo: row.DS_CARGO,
                    });
                }

                let existingEleicao = await Eleicao.findOne({
                    where: {
                        ano_eleicao: row.ANO_ELEICAO,
                        turno: row.NR_TURNO,
                    },
                });

                if (!existingEleicao) {
                    existingEleicao = await Eleicao.create({
                        ano_eleicao: row.ANO_ELEICAO,
                        turno: row.NR_TURNO,
                    });
                }

                let existingOcupacao = await Ocupacao.findOne({
                    where: {
                        nome_ocupacao: row.DS_OCUPACAO,
                    },
                });

                if (!existingOcupacao) {
                    existingOcupacao = await Ocupacao.create({
                        nome_ocupacao: row.DS_OCUPACAO,
                    });
                }

                let existingUnidadeEleitoral = await UnidadeEleitoral.findOne({
                    where: {
                        sigla: isNaN(row.SG_UE) ? row.SG_UE : parseInt(row.SG_UE).toString(),
                    },
                });

                if (!existingUnidadeEleitoral) {
                    existingUnidadeEleitoral = await UnidadeEleitoral.create({
                        sigla: isNaN(row.SG_UE) ? row.SG_UE : parseInt(row.SG_UE).toString(),
                        abrangencia: row.TP_ABRANGENCIA,
                        nome: row.NM_UE, 
                    });
                    console.log("erro unidade eleitoral")
                }

                let existingGrauDeInstrucao = await GrauDeInstrucao.findOne({
                    where: {
                        nome_instrucao: row.DS_GRAU_INSTRUCAO,
                    },
                });

                if (!existingGrauDeInstrucao) {
                    existingGrauDeInstrucao = await GrauDeInstrucao.create({
                        nome_instrucao: row.DS_GRAU_INSTRUCAO,
                    });
                    console.log("erro unidade instrucai")
                }

                let existingSituacaoTurno = await SituacaoTurno.findOne({
                    where: {
                        nome: row.DS_SIT_TOT_TURNO,
                    },
                });

                if (!existingSituacaoTurno) {
                    existingSituacaoTurno = await SituacaoTurno.create({
                        nome: row.DS_SIT_TOT_TURNO,
                    });
                    console.log("erro unidade existingSituacaoTurno")
                }

                let existingSituacaoCandidatura = await SituacaoCandidatura.findOne({
                    where: {
                        nome: row.DS_SITUACAO_CANDIDATURA,
                    },
                });

                if (!existingSituacaoCandidatura) {
                    existingSituacaoCandidatura = await SituacaoCandidatura.create({
                        nome: row.DS_SITUACAO_CANDIDATURA,
                    });
                    console.log("erro unidade existingSituacaoCandidatura")
                }
                    
                let candidatoEleicao = await CandidatoEleicao.create({
                    situacao_reeleicao: row.ST_REELEICAO.toLowerCase().includes('s') ? true : false,
                    idade_data_da_posse: row.NR_IDADE_DATA_POSSE,
                    coligacao: row.DS_COMPOSICAO_COLIGACAO,
                    nome_urna_candidato: row.NM_URNA_CANDIDATO,
                    despesa_campanha: row.VR_DESPESA_MAX_CAMPANHA,
                    CandidatoId: existingCandidato.get("id"),
                    EleicaoId: existingEleicao.get("id"),
                    SituacaoTurnoId: existingSituacaoTurno.get("id"),
                    SituacaoCandidaturaId: existingSituacaoCandidatura.get("id"),
                    GrauDeInstrucaoId: existingGrauDeInstrucao.get("id"),
                    OcupacaoId: existingOcupacao.get("id"),
                    PartidoId: existingPartido.get("id"),
                    CargoId: existingCargo.get("id"),
                    UnidadeEleitoralId: existingUnidadeEleitoral.get("id"),
                    
                });
                //await candidatoEleicao.setSituacaoTurno(existingSituacaoTurno)
                // await candidatoEleicao.setSituacaoCandidatura(existingSituacaoCandidatura)
                // await candidatoEleicao.setGrauDeInstrucao(existingGrauDeInstrucao)
                // await candidatoEleicao.setUnidadeEleitoral(existingUnidadeEleitoral)
                // await candidatoEleicao.setOcupacao(existingOcupacao)
                // await candidatoEleicao.addCandidatoEleicao(existingCandidato);
                // await candidatoEleicao.addCandidatoEleicao(existingEleicao);
                // await candidatoEleicao.setPartido(existingPartido);
                // await candidatoEleicao.setCargo(existingCargo);

                
                //await existingSituacaoTurno.addCandidatoEleicao(candidatoEleicao);
                // await existingSituacaoCandidatura.addCandidatoEleicao(candidatoEleicao)
                // await existingGrauDeInstrucao.addCandidatoEleicao(candidatoEleicao)
                // await existingUnidadeEleitoral.addCandidatoEleicao(candidatoEleicao)
                // await existingOcupacao.addCandidatoEleicao(candidatoEleicao)
                // await existingCandidato.addCandidatoEleicao(candidatoEleicao);
                // await existingEleicao.addCandidatoEleicao(candidatoEleicao);
                // await existingPartido.addCandidatoEleicao(candidatoEleicao);
                // await existingCargo.addCandidatoEleicao(candidatoEleicao);

                //console.log("salvo!")


            })
            await Promise.all(promises)
            console.log(`Processado ${Math.min(i + batchSize, rows.length)} de ${rows.length}`);
        }
        console.log("fimmmmmmmmmmmmm")
        await sequelize.close();

        //})
    } catch (error) {
        console.error('Erro:', error);
    } finally {
        // Feche a conexão com o banco de dados
       
    }
})();   