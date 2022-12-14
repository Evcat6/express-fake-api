const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config({ path: ".env.local" });

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
});

const User = sequelize.define('user', {
    id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false
});

const Quotes = sequelize.define('quotes', {
    id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    quote: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false
});



// exports
module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Quotes = Quotes;
module.exports.Sequelize = Sequelize;