const sequelize = require("../db/sequelize-connection");

const Candidato  = require('./Candidato');
const Eleicao  = require('./Eleicao');
const  Ocupacao  = require('./Ocupacao');
const  Cargo  = require('./Cargo');
const Partido = require('./Partido'); 
const CandidatoEleicao = require('./CandidatoEleicao'); 
const UnidadeEleitoral = require('./UnidadeEleitoral'); 
const GrauDeInstrucao = require('./GrauDeInstrucao');
const Raca = require('./Raca');
const Genero = require('./Genero');
const SituacaoCandidatura = require('./SituacaoCandidatura');
const SituacaoTurno = require('./SituacaoTurno');


CandidatoEleicao.belongsTo(Candidato);
Candidato.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Eleicao);
Eleicao.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Ocupacao);
Ocupacao.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Cargo);
Cargo.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(Partido);
Partido.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(UnidadeEleitoral);
UnidadeEleitoral.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(GrauDeInstrucao);
GrauDeInstrucao.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(SituacaoTurno);
SituacaoTurno.hasMany(CandidatoEleicao);

CandidatoEleicao.belongsTo(SituacaoCandidatura);
SituacaoCandidatura.hasMany(CandidatoEleicao);

Candidato.belongsTo(Genero);
Genero.hasMany(Candidato);

Candidato.belongsTo(Raca);
Raca.hasMany(Candidato);


console.log('Sync Models');
sequelize.sync();

