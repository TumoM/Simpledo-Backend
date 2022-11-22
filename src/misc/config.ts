require("dotenv").config();

const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_TABLE,
    },
};
module.exports = config;