'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Properties', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                required: true,
                type: Sequelize.INTEGER
            },
            Host: {
                type: Sequelize.STRING,
                allowNull: false
            },
            AdressLine1: {
                type: Sequelize.STRING,
                allowNull: false
            },
            AdressLine2: {
                type: Sequelize.STRING
            },
            AdressLine3: {
                type: Sequelize.STRING
            },
            AdressLine4: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Postcode: {
                type: Sequelize.STRING,
                allowNull: false
            },
            City: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Country: {
                type: Sequelize.STRING,
                allowNull: false
            },
            numberOfBedrooms: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            numberOfBathrooms: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            incomeGenerated: {
                type: Sequelize.DECIMAL(18, 2),
                allowNull: false
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
        return queryInterface.dropTable('Properties');
    }
};