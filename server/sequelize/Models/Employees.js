const { DataTypes } = require('sequelize');

const schema = {
    // e_id : {
    //     type: DataTypes.BIGINT,
    //     primaryKey: true,
    // },
    employeeId : {
        type: DataTypes.BIGINT,
    },
    companyId : {
        type: DataTypes.BIGINT,
    },
    firstName : {
        type: DataTypes.STRING,
    },
    lastName : {
        type: DataTypes.STRING,
    },
    email : {
        type: DataTypes.STRING,
    },
    companyName : {
        type: DataTypes.STRING,
    },
    managerId : {
        type: DataTypes.BIGINT,
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

module.exports = ['employees',schema];