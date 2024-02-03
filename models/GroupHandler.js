const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const GroupHandler = sequelize.define('grouphandler', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = GroupHandler;
