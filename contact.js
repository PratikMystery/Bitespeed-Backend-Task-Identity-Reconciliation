const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("test", "user", "secret", {
    host: "db",
    dialect: "mysql",
});

const Contact = sequelize.define(
    "Contact",
    {
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
    },
    {
        freezeTableName: true,
    }
);

module.exports = Contact;
