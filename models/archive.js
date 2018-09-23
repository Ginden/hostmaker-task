'use strict';
module.exports = (sequelize, DataTypes) => {
    const Archive = sequelize.define('Archive', {
        Table: DataTypes.STRING,
        TableId: DataTypes.INTEGER,
        eventType: DataTypes.STRING,
        value: DataTypes.JSON
    }, {});
    Archive.associate = function () {
    };
    return Archive;
};