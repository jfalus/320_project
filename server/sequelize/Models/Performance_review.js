const { DataTypes } = require('sequelize');

const schema = {
    employeeId : {
        type: DataTypes.BIGINT,
    },
    companyId : {
        type: DataTypes.BIGINT,
    },
    pr_id : {
        type: DataTypes.BIGINT,
        primaryKey: true,
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
    sent_from : {
        type: DataTypes.BIGINT,
    },
};

module.exports = ['performance_review',schema];