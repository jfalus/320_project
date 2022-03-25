const { DataTypes } = require('sequelize');

const schema = {
    pr_id : {
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
    overall_comments: {
        type: DataTypes.STRING,
    },
    growth_feedback : {
        type: DataTypes.INTEGER,
    },
    kindness_feedback : {
        type: DataTypes.INTEGER,
    },
    delivery_feedback : {
        type: DataTypes.INTEGER,
    },
    date_created : {
        type: DataTypes.DATE,
    },
    progress : {
        type: DataTypes.STRING,
    },
    assigned_to : {
        type: DataTypes.BIGINT,
    },
};

module.exports = ['performance_review',schema];