'use strict';
module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
        Host: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 3
            }
        },
        AdressLine1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        AdressLine2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        AdressLine3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        AdressLine4: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 255]
            }
        },
        Postcode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 20]
            }
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 255]
            }
        },
        Country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 100]
            }
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        numberOfBedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        numberOfBathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        incomeGenerated: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
            validate: {
                biggerThanZero(value) {
                    if (!value || value < 0) {
                        throw new Error('Income generated have to bigger than 0');
                    }
                }
            }
        }
    }, {
        hooks: {
            beforeSave(instance) {
                const tableName = this.name;
                return sequelize.models.Archive.create({
                    Table: tableName,
                    TableId: instance.id,
                    eventType: 'save',
                    value: instance
                })

            },
            beforeDestroy(instance) {
                const tableName = this.name;
                return sequelize.models.Archive.create({
                    Table: tableName,
                    TableId: instance.id,
                    eventType: 'delete',
                    value: instance
                })
            },
            beforeUpdate(instance) {
                const tableName = this.name;
                return sequelize.models.Archive.create({
                    Table: tableName,
                    TableId: instance.id,
                    eventType: 'update',
                    value: instance
                });
            }
        }
    });
    Property.associate = function () {
        // Associations can be defined here
    };

    return Property;
};