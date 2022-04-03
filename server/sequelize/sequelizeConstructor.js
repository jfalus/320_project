require('dotenv').config();
// console.log(process.env.DATABASE_URI);
const { Sequelize } = require('sequelize');


DATABASE_URL = process.env.DATABASE_URI;

DATABASE_OPTIONS = {
    logging: false,
    dialect: 'postgres',
    sqlConnectionSsl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}
const sequelize = new Sequelize(DATABASE_URL, DATABASE_OPTIONS);

const modelDefiners = [
    require('./Models/Employees'),
    require('./Models/Pto_request'),
    require('./Models/Performance_review'),
    require('./Models/Assigned_training'),
    require('./Models/General_task'),
];

for (const modelDefiner of modelDefiners) {
    sequelize.define(...modelDefiner, {
        timestamps: false,
        freezeTableName: true,
    });
}

require('./sequelizeConstraints')(sequelize);

module.exports = sequelize;