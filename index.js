const fs = require('fs');
const csvParser = require('csv-parser');
const sequelize = require('./sequelize-config');
const Candidato = require('./models/Candidato');

// Caminho para o arquivo CSV
const csvFilePath = 'seu_arquivo.csv';

// Sincronize o modelo com o banco de dados
(async () => {
    try {
        await sequelize.sync({ force: true }); // Use { force: true } apenas para criar a tabela (cuidado, isso apagará dados existentes)

        fs.createReadStream(csvFilePath)
            .pipe(csvParser({ separator: ';' }))
            .on('data', async (row) => {
                // Insira os dados do CSV no modelo
                await Candidato.create({
                    NM_CANDIDATO: row.NM_CANDIDATO,
                    NR_CANDIDATO: parseInt(row.NR_CANDIDATO, 10),
                    // Mapeie os outros campos do modelo aqui...
                });
            })
            .on('end', () => {
                console.log('Dados do CSV inseridos com sucesso.');
            });
    } catch (error) {
        console.error('Erro:', error);
    } finally {
        // Feche a conexão com o banco de dados
        await sequelize.close();
    }
})();