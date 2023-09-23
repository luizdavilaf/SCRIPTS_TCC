const fs = require('fs');
const csvParser = require('csv-parser');
//const sequelize = require('./sequelize-config');
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
const sequelize = require("./db/sequelize-connection");
const db = require('./db/dbconnection');
const { Sequelize } = require("sequelize");
const sync = require('./models/sync')


// Caminho para o arquivo CSV
const csvFilePath = 'E:\\repos\\SCRIPTS_TCC\\csvs\\consulta_cand_2002_BRASIL.csv';
const linhas = []

const readCsv = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath, 'latin1')
            .pipe(csvParser({ separator: ';' }))
            .on('data', async (row) => {
                //  console.log(row.DS_GENERO)
                /* console.log(row.SQ_CANDIDATO)
                console.log(row.NM_CANDIDATO) */
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
                    TP_ABRANGENCIA: row.TP_ABRANGENCIA,
                    DS_SITUACAO_CANDIDATURA: row.DS_SITUACAO_CANDIDATURA,
                    ST_REELEICAO: row.ST_REELEICAO,
                    NR_IDADE_DATA_POSSE: row.NR_IDADE_DATA_POSSE,
                    DS_COMPOSICAO_COLIGACAO: row.DS_COMPOSICAO_COLIGACAO,
                    DS_GRAU_INSTRUCAO: row.DS_GRAU_INSTRUCAO,
                    DS_SIT_TOT_TURNO: row.DS_SIT_TOT_TURNO,
                    NM_URNA_CANDIDATO: row.NM_URNA_CANDIDATO,
                    DS_COR_RACA: row.DS_COR_RACA,
                }
                linhas.push(linha)
            })
            .on('end', () => {
                resolve(linhas)
            });
    })
}

(async () => {
    try {
        readCsv().then(async (rows) => {
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                // Insira os dados do CSV no modelo
                let existingCandidato = null;

                console.log(rows.length - i)
                if (row.NR_CPF_CANDIDATO !== '-1') {
                    existingCandidato = await Candidato.findOne({
                        where: {
                            NR_CPF_CANDIDATO: row.NR_CPF_CANDIDATO,
                        },
                    });
                } else if (row.NR_TITULO_ELEITORAL_CANDIDATO !== '-1') {
                    existingCandidato = await Candidato.findOne({
                        where: {
                            NR_TITULO_ELEITORAL_CANDIDATO: row.NR_TITULO_ELEITORAL_CANDIDATO,
                        },
                    });
                } else if (row.SQ_CANDIDATO !== '-1') {
                    existingCandidato = await Candidato.findOne({
                        where: {
                            SQ_CANDIDATO: row.SQ_CANDIDATO,
                        },
                    });
                }

                let existingGenero = await Genero.findOne({
                    where: {
                        DS_GENERO: row.DS_GENERO,
                    },
                });

                if (!existingGenero) {
                    existingGenero = await Genero.create({
                        DS_GENERO: row.DS_GENERO,
                    });
                }

                let existingRaca
                if (row.DS_COR_RACA) {
                    existingRaca = await Raca.findOne({
                        where: {
                            DS_COR_RACA: row.DS_COR_RACA,
                        },
                    });
                    if (!existingRaca) {
                        existingRaca = await Raca.create({
                            DS_COR_RACA: row.DS_COR_RACA,
                        });
                    }
                }

                if (!existingCandidato) {
                    existingCandidato = await Candidato.create({
                        NM_CANDIDATO: row.NM_CANDIDATO,
                        SQ_CANDIDATO: row.SQ_CANDIDATO,
                        NR_CPF_CANDIDATO: row.NR_CPF_CANDIDATO,
                        NR_TITULO_ELEITORAL_CANDIDATO: row.NR_TITULO_ELEITORAL_CANDIDATO,
                        NM_MUNICIPIO_NASCIMENTO: row.NM_MUNICIPIO_NASCIMENTO,
                        SG_UF_NASCIMENTO: row.SG_UF_NASCIMENTO,
                    });
                }
                if (existingRaca && existingCandidato && !existingCandidato.Raca) {
                    await existingRaca.addCandidato(existingCandidato)
                }
                await existingGenero.addCandidato(existingCandidato)

                let existingPartido = await Partido.findOne({
                    where: {
                        SG_PARTIDO: row.SG_PARTIDO,
                    },
                });

                if (!existingPartido) {
                    existingPartido = await Partido.create({
                        SG_PARTIDO: row.SG_PARTIDO,
                        NM_PARTIDO: row.NM_PARTIDO,
                    });
                }

                let existingCargo = await Cargo.findOne({
                    where: {
                        DS_CARGO: row.DS_CARGO,
                    },
                });

                if (!existingCargo) {
                    existingCargo = await Cargo.create({
                        DS_CARGO: row.DS_CARGO,
                    });
                }

                let existingEleicao = await Eleicao.findOne({
                    where: {
                        ANO_ELEICAO: row.ANO_ELEICAO,
                        NR_TURNO: row.NR_TURNO,
                    },
                });

                if (!existingEleicao) {
                    existingEleicao = await Eleicao.create({
                        ANO_ELEICAO: row.ANO_ELEICAO,
                        NR_TURNO: row.NR_TURNO,
                    });
                }

                let existingOcupacao = await Ocupacao.findOne({
                    where: {
                        DS_OCUPACAO: row.DS_OCUPACAO,
                    },
                });

                if (!existingOcupacao) {
                    existingOcupacao = await Ocupacao.create({
                        DS_OCUPACAO: row.DS_OCUPACAO,
                    });
                }

                let existingUnidadeEleitoral = await UnidadeEleitoral.findOne({
                    where: {
                        SG_UE: row.SG_UE,
                    },
                });

                if (!existingUnidadeEleitoral) {
                    existingUnidadeEleitoral = await UnidadeEleitoral.create({
                        SG_UE: row.SG_UE,
                        TP_ABRANGENCIA: row.TP_ABRANGENCIA,
                    });
                }

                let existingGrauDeInstrucao = await GrauDeInstrucao.findOne({
                    where: {
                        DS_GRAU_INSTRUCAO: row.DS_GRAU_INSTRUCAO,
                    },
                });

                if (!existingGrauDeInstrucao) {
                    existingGrauDeInstrucao = await GrauDeInstrucao.create({
                        DS_GRAU_INSTRUCAO: row.DS_GRAU_INSTRUCAO,
                    });
                }

                let existingSituacaoTurno = await SituacaoTurno.findOne({
                    where: {
                        DS_SIT_TOT_TURNO: row.DS_SIT_TOT_TURNO,
                    },
                });

                if (!existingSituacaoTurno) {
                    existingSituacaoTurno = await SituacaoTurno.create({
                        DS_SIT_TOT_TURNO: row.DS_SIT_TOT_TURNO,
                    });
                }

                let existingSituacaoCandidatura = await SituacaoCandidatura.findOne({
                    where: {
                        DS_SITUACAO_CANDIDATURA: row.DS_SITUACAO_CANDIDATURA,
                    },
                });

                if (!existingSituacaoCandidatura) {
                    existingSituacaoCandidatura = await SituacaoCandidatura.create({
                        DS_SITUACAO_CANDIDATURA: row.DS_SITUACAO_CANDIDATURA,
                    });
                }

                let candidatoEleicao = await CandidatoEleicao.create({
                    ST_REELEICAO: row.ST_REELEICAO.toLowerCase().includes('s') ? true : false,
                    NR_IDADE_DATA_POSSE: row.NR_IDADE_DATA_POSSE,
                    DS_COMPOSICAO_COLIGACAO: row.DS_COMPOSICAO_COLIGACAO,
                    NM_URNA_CANDIDATO: row.NM_URNA_CANDIDATO,
                });

                await existingSituacaoTurno.addCandidatoEleicao(candidatoEleicao)
                await existingSituacaoCandidatura.addCandidatoEleicao(candidatoEleicao)
                await existingGrauDeInstrucao.addCandidatoEleicao(candidatoEleicao)
                await existingUnidadeEleitoral.addCandidatoEleicao(candidatoEleicao)
                await existingOcupacao.addCandidatoEleicao(candidatoEleicao)
                await existingCandidato.addCandidatoEleicao(candidatoEleicao);
                await existingEleicao.addCandidatoEleicao(candidatoEleicao);
                await existingPartido.addCandidatoEleicao(candidatoEleicao);
                await existingCargo.addCandidatoEleicao(candidatoEleicao);

                //console.log("salvo!")

            }
        })









    } catch (error) {
        console.error('Erro:', error);
    } finally {
        // Feche a conexão com o banco de dados
        //await sequelize.close();
    }
})();