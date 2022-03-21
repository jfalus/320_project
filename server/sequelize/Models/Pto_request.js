const { DataTypes } = require('sequelize');

const schema = {
    employeeId : {
        type: DataTypes.BIGINT,
    },
    companyId : {
        type: DataTypes.BIGINT,
    },
    ptoId : {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
    },
    start_date : {
        type: DataTypes.DATE,
    },
    end_date : {
        type: DataTypes.DATE,
    },
    notes : {
        type: DataTypes.STRING,
    },
    date_created : {
        type: DataTypes.DATE,
    },
    progress : {
        type: DataTypes.STRING,
    },
};

module.exports = ['pto_request',schema];