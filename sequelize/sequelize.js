const { Sequelize, DataTypes } = require('sequelize');


// postgres://ryfdedaf:ZeCAkVXTuv3m5uJ6w5EQWedSNFEu9SAY@mel.db.elephantsql.com/ryfdedaf

const sequelize = new Sequelize('ryfdedaf', 'ryfdedaf', 'ZeCAkVXTuv3m5uJ6w5EQWedSNFEu9SAY', {
    host: 'mel.db.elephantsql.com',
    dialect: 'postgres',
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