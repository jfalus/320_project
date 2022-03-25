const { DataTypes } = require('sequelize');

const schema = {
    at_id : {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    employeeId : {
        type: DataTypes.BIGINT,
    },
    companyId : {
        type: DataTypes.BIGINT,
    },
    title : {
        type: DataTypes.STRING,
    },
    description : {
        type: DataTypes.STRING,
    },
    link: {
        type: DataTypes.STRING,
    },
    date_created : {
        type: DataTypes.DATE,
    },
    date_due : {
        type: DataTypes.DATE,
    },
    progress : {
        type: DataTypes.STRING,
    },
};

module.exports = ['assigned_training',schema];