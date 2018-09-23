'use strict';
module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
        Host: {
            type: DataTypes.STRING,
            allowNull: false
        },
        AdressLine1: {
            type: DataTypes.STRING,
            allowNull: false
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
            allowNull: false
        },
        Postcode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        numberOfBedrooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numberOfBathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        incomeGenerated: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        }
    }, {
        hooks: {
            beforeSave(instance, options) {
                const tableName = this.name;
                return sequelize.models.Archive.create({
                    Table: tableName,
                    TableId: instance.id,
                    eventType: 'save',
                    value: instance
                })

            },
            beforeDestroy(instance, options) {
                const tableName = this.name;
                return sequelize.models.Archive.create({
                    Table: tableName,
                    TableId: instance.id,
                    eventType: 'delete',
                    value: instance
                })
            },
            beforeUpdate(instance, options) {
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