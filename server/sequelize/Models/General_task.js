const { DataTypes } = require('sequelize');

const schema = {
    task_id : {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    employeeId : {
        type: DataTypes.BIGINT,
    },
    companyId : {
        type: DataTypes.BIGINT,
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
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
    assigned_to: {
        type: DataTypes.BIGINT,
    },
};

module.exports = ['general_task',schema];