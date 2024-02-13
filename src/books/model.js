const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Book = sequelize.define(
    "Book",
    {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            defaultValue: "not specified",
        },
        genre: {
            type: DataTypes.STRING,
            defaultValue: "not specified",
        },
    },
    { timestamps: true }
);

module.exports = Book;
