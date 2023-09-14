const sequelize = require("../db/sequelize-connection");

const Candidato  = require('./Candidato');
const Eleicao  = require('./Eleicao');
const  Ocupacao  = require('./Ocupacao');
const  Cargo  = require('./Cargo');
const Partido = require('./Partido'); 
const CandidatoEleicao = require('./CandidatoEleicao');


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



console.log('Sync Models');
sequelize.sync();

