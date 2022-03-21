const { DataTypes } = require('sequelize');

const EmployeeSchema = {
    firstName : {
        type: DataTypes.STRING,
    },
    lastName : {
        type: DataTypes.STRING,
    },
    employeeId : {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    email : {
        type: DataTypes.STRING,
    },
    companyId : {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    managerId : {
        type: DataTypes.BIGINT,
    },
    companyName: {
        type: DataTypes.STRING,
    },
    positionTitle : {
        type: DataTypes.STRING,
    },
    startDate : {
        type: DataTypes.DATE,
    },
    isManager : {
        type: DataTypes.BOOLEAN,
    },
    password : {
        type: DataTypes.STRING,
    },
};

module.exports = ['employees',EmployeeSchema];