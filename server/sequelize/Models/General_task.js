const { DataTypes } = require('sequelize');

const schema = {
    employeeId : {
        type: DataTypes.BIGINT,
    },
    companyId : {
        type: DataTypes.BIGINT,
    },
    task_id : {
        type: DataTypes.BIGINT,
        primaryKey: true,
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
};

module.exports = ['general_task',schema];