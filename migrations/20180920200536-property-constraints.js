'use strict';

const constraintName = 'BUSINESS_REQUIREMENTS_PROPERTIES';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const {Op} = Sequelize;
        return queryInterface.addConstraint('Properties', ['numberOfBedrooms', 'numberOfBathrooms', 'incomeGenerated'], {
            type: 'check',
            name: constraintName,
            where: {
                numberOfBedrooms: {
                    [Op.gt]: 0
                },
                numberOfBathrooms: {
                    [Op.gte]: 0
                },
                incomeGenerated: {
                    [Op.gt]: 0 // This is a bit strange
                }
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint('Properties', constraintName);
    }
};
