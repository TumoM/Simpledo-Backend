const { Sequelize } = require('sequelize');
// @ts-ignore
const configFile = require('../misc/config');

const db = async () => {
    const sequelize = await new Sequelize(configFile.db.database, configFile.db.user, configFile.db.password, {
        host: configFile.db.host,
        port: configFile.db.port,
        dialect: 'mysql'
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return new Error('Could not connect to the db')
    }
}

const sequelize = new Sequelize(configFile.db.database, configFile.db.user, configFile.db.password, {
    host: configFile.db.host,
    dialect: 'mysql'
}, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return new Error('Could not connect to the db')
    }
});

db();

module.exports = sequelize

