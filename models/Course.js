'use strict';
const {Model, Sequelize} = require('sequelize');
// const { Sequelize } = require('../../JS-TD-P8-SQL-Library-Manager/models');

module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
        Course.init({
            // id: {
            //     type: Sequelize.INTEGER,
            //     autoIncrement: true,
            //     primaryKey: true
            // },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: {
                    msg: "Please supply a unique course title!"
                }
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            estimatedTime: {
                type: Sequelize.STRING,
                allowNull: false
            },
            materialsNeeded: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {sequelize});

        Course.associate = (models) => {
            Course.belongsTo(models.User, {
                as: 'courseOwner',
                foreignKey: {
                    fieldName: 'userId',
                    allowNull: false,
                }
            })
        }

        return Course;
    
}

