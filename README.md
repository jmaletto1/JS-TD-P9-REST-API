# JS-TD-P9-REST-API
 
# Welcome to my REST API, the first part of a Full Stack app alongside React.

## Purpose
 
This app makes use of Express, Sequelize & Node.js to build a database & REST API for a school application (which will later
be deployed with React). The API will provide a way to administer a school database that contains information about users
and courses. Users can sign up, log-in, view their credentials, as well as view the current courses on offer, create their own
courses, as well as updating and deleting courses they have previously submitted.

## How to run the App

To run the app, simply enter 'npm start' into the terminal and wait for the app to load!

### Functionality

The app has two main sets of routes, one for users, and one for courses. The user routes allow a user to register themselves in
the database, by providing a first name, last name, e-mail address and password. Once registered, the user can view their data
at the /users GET route, which displays their account details (minus their password).

The courses routes allow the user to complete a number of actions:

1) GET /courses - This route allows the user to view all of the courses in the database. This displays the title, description,
estimated time to completion, the materials required, and the full name and contact details of the user that submitted the 
course to the database.

2) GET /courses/:id - Similar to the previous route, this option allows the user to view the information for one specific
course.

3) POST /courses - This route allows the user to submit a new course to the database. To do so, a user must have provided
an authorisation header, or their request will be denied. There are also validation checks in place for the "title" and
"description" fields, meaning these cannot be left empty or null, or an error will be thrown.

4) PUT /courses/:id - This route allows users to update an existing course. To ensure that users cannot update courses
that they did not create, validation has been implemented on this route. If a user tries to update a course that is not
their own, an error will be thrown. Similar to the POST /courses route, errors will also be thrown if the "title" and/or
"description" fields are left empty or null.

5) DELETE /courses/:id - The final of the courses routes allows a user to delete an existing course record. Once again,
this route has validation in place - meaning a user cannot remove an entry that they did not create themselves. If they 
do attempt to do so, an error message is provided.


#### Coding Layout

The bulk of the back-end for this project has been delivered in 3 folders - Models, Routes and Middleware.

As well as Index file, which initialises the Database connection, the folder also contains both a User and Courses model.
These models define how Sequelize communicates with the database file (fsjstd-restapi.db). Each model calls the .init() 
method to initialise the model, and then describes the various data types that will be present in each row of the table.
Validation such as allowNull, notEmpty and notNull are provided for a large number of these data types. In addition,
the e-mail Address field also uses an isEmail validator, to ensure the user has submitted a string in the form of an e-mail
address. Lastly, the User model also makes use of two password fields - password and confirmedPassword. One of these is set
to virtual, so that duplicate data is not stored in the database. The password field compares the two values (to ensure they
are a match), before using the bcrypt .hashSync method to hash the password.

The routes folder contains one file that manages all routes - index.js. This route determines the GET, POST, PUT and DELETE 
routes that will be visited by the user. Each route makes use of a middleware function, called asyncHandler (located in the 
/middleware folder). By hosting this function in a separate file, index.js is kept to a slightly more compact format. There 
is a second middleware function, auth-user.js, which is used to verify a user's login-details for certain functions.

I hope this has provided an overview into this application, and that you enjoy using it to submit or update any course details. 
If you have any queries or ideas for further improvements, do not hesitate to contact me!

