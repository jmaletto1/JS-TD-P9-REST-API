'use strict';
const {Model, Sequelize} = require('sequelize');

/*
Set the Course model. This includes the fields title, description, estimatedTime
and materialsNeeded. A "belongsTo" association is also registered to the User
Model.
*/
module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
        Course.init({
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: "Pease enter a course title."},
                    notEmpty: {msg: "Don't forget to enter a course title!"}
                }
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: "Please enter a course description!"},
                    notEmpty: {msg: "Don't forget to enter a course description!"}
                }
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

