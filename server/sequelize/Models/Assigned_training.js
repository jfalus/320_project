const { DataTypes } = require('sequelize');

const schema = {
    employeeId : {
        type: DataTypes.BIGINT,
    },
    companyId : {
        type: DataTypes.BIGINT,
    },
    at_id : {
        type: DataTypes.BIGINT,
        primaryKey: true,
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