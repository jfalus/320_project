const { DataTypes } = require('sequelize');

const schema = {
    pto_id : {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    e_id : {
        type: DataTypes.BIGINT,
    },
    title : {
        type: DataTypes.STRING,
    },
    description : {
        type: DataTypes.STRING,
    },
    start_date : {
        type: DataTypes.DATEONLY,
    },
    end_date : {
        type: DataTypes.DATEONLY,
    },
    date_created : {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
    date_due : {
        type: DataTypes.DATEONLY,
    },
    progress : {
        type: DataTypes.STRING,
    },
    approved : {
        type: DataTypes.BOOLEAN,
    },
    assigned_to : {
        type: DataTypes.BIGINT,
    },
};

module.exports = ['pto_request',schema];