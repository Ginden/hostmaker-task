'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Archives', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Table: {
                type: Sequelize.STRING,
                allowNull: false
            },
            TableId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            eventType: {
                type: Sequelize.STRING,
                allowNull: false
            },
            value: {
                type: Sequelize.JSON,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Archives');
    }
};