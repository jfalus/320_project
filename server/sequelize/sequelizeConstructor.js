const { Sequelize } = require('sequelize');

// Extract database uri from environmental variables
require('dotenv').config();

if(process.env.ENV === 'DEV'){
    DATABASE_OPTIONS = {logging: false}
} else{
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

}


const DATABASE_URI = process.env.DATABASE_URI;

console.log(DATABASE_URI)
const sequelize = new Sequelize(DATABASE_URI, DATABASE_OPTIONS);


const modelDefiners = [
    require('./Models/Employees'),
    // require('./Models/Pto_request'),
    // require('./Models/Performance_review'),
    // require('./Models/Assigned_training'),
    // require('./Models/General_task'),
];

for (const modelDefiner of modelDefiners) {
    sequelize.define(...modelDefiner);
}

// require('./sequalizeConstraints')(sequelize);

module.exports = sequelize;