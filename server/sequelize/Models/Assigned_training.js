const { DataTypes } = require('sequelize');

const schema = {
    at_id : {
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
    link: {
        type: DataTypes.STRING,
        allowNull: false,
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
};

module.exports = ['assigned_training',schema];