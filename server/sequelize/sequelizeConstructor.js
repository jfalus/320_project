const { Sequelize } = require('sequelize');

// Extract database uri from environmental variables
require('dotenv').config();

DATABASE_URL = "postgres://pmykybuouedzak:09807d514a8fd156e0cf3d91850f85de24c1301ffcf5abad52e718ca801225fb@ec2-44-193-188-118.compute-1.amazonaws.com:5432/d5c4r711daleuf"


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
console.log(DATABASE_URL)
const sequelize = new Sequelize(DATABASE_URL, DATABASE_OPTIONS);

const modelDefiners = [
    require('./Models/Employee'),
    // require('./Models/Pto_request'),
    // require('./Models/Performance_review'),
    // require('./Models/Assigned_training'),
    // require('./Models/General_task'),
];

for (const modelDefiner of modelDefiners) {
    sequelize.define(...modelDefiner, {
        timestamps: false
    });
}

// require('./sequalizeConstraints')(sequelize);

module.exports = sequelize;