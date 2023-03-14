const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            require: true
        },
        password:{
            type: DataTypes.STRING,
            require: true
        },
        email:{
            type: DataTypes.STRING,
            require: true
        }
    });
    return User;
}