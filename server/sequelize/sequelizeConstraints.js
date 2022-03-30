const { Sequelize } = require('sequelize');


/**
 * Provides extra room for setting up sequelize
 *
 * @param {Sequelize} sequelize sequalize object
 */
function applyExtraSetup(sequelize) {
    // Setup inter-model relations here, like foreign keys etc.
    const {employees, pto_request, performance_review, assigned_training, general_task} = sequelize.models;

    // array of task models
    const taskModels = [pto_request, performance_review, assigned_training, general_task];

    taskModels.map(tasks =>
        employees.hasMany(tasks, {
        foreignKey: 'e_id',
        sourceKey: 'e_id',
    }))

    taskModels.map(tasks =>
        tasks.belongsTo(employees, {
        foreignKey: 'e_id',
        targetKey: 'e_id',
    }))
}

module.exports = applyExtraSetup;