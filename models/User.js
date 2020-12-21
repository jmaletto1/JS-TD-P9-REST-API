'use strict';
const {Model, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: "Please enter your first name"},
                notEmpty: {msg: "You forgot to enter your first name!"}
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: "Please enter your last name"},
                notEmpty: {msg: "You forgot to enter your last name!"}
            }
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: "Unfortunately, that e-mail address is already registered!"
            },
            validate: {
                notNull: {msg: "An email address is required"},
                isEmail: {msg: "Please enter a valid email address."}            
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please enter a password"
                },
                notEmpty: {
                    msg: "Please enter a valid password."
                },
                len: {
                    args: [8, 20],
                    msg: "Your password needs to be between 8 and 20 characters!"
                }
            }
        }
    }, {sequelize});

    User.associate = (models) => {
        User.hasMany(models.Course, {
            as: 'courseOwner',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            }
        })
    }

    return User;
}