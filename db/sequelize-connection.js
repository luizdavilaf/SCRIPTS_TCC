const { Sequelize, DataTypes } = require('sequelize');



const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/database.db',
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        //sequelize.sync({ force: true });
        sequelize.sync()
        console.log("sync ok")
    }).catch(error => {
        console.log('Unable to connect to the database:', error);
    });

module.exports = sequelize;