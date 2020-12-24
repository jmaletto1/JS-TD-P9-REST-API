'use strict';
const {Model, Sequelize} = require('sequelize');
const bcrypt = require('bcrypt');

/*
Set the User model. This includes the fields firstName, lastName, emailAddress,
password and confirmedPassword. A "hasMany" association is also registered to the Courses
Model.
*/
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
                },
                set(val) {
                    const hashedPassword = bcrypt.hashSync(val, 10);
                    this.setDataValue('password', hashedPassword)
                }
            }
        }
        // confirmedPassword: {
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //     set(val) {
        //         if (val === this.password) {
        //             const hashedPassword = bcrypt.hashSync(val, 10);
        //             this.setDataValue('confirmedPassword', hashedPassword);
        //         }
        //     },
        //         notNull: {
        //             msg: "Both passwords must match!"
        //         }
        //     }
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