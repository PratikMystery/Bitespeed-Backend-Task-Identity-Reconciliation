const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("test", "root", "Bitespeed@123", {
    host: "127.0.0.1",
    dialect: "mysql",
});

const Contact = sequelize.define("Contact", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    linkedId: {
        type: DataTypes.INTEGER,
    },
    linkPrecedence: {
        type: DataTypes.ENUM("secondary", "primary"),
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
});

module.exports = Contact;
