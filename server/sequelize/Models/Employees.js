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
    },
    email : {
        type: DataTypes.STRING,
    },
    companyId : {
        type: DataTypes.BIGINT,
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
        type: DataTypes.STRING,
    },
    isManager : {
        type: DataTypes.BOOLEAN,
    },
    password : {
        type: DataTypes.STRING,
    },
};

module.exports = ['Employee',EmployeeSchema];