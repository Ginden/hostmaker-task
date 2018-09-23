'use strict';


module.exports = (sequelize, DataTypes) => {
    const Archive = sequelize.define('Archive', {
        Table: DataTypes.STRING,
        TableId: DataTypes.INTEGER,
        eventType: DataTypes.STRING,
        value: DataTypes.JSON
    }, {});
    return Archive;
};