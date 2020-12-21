let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser')
const User = require('../models').User;
const Course = require('../models').Course;
const { Op } = require('sequelize');
const { authenticateUser } = require('../middleware/auth-user');

router.use(bodyParser.json());

// asyncHandler Middleware function
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch(error) {
            next(error);
        }
        }
    }

router.get('/', (req, res) => {
    res.json({message: "Hi MAN"});
    res.status(201);
})

// View Users Route
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(201);
    res.json({msg: `Welcome, ${user.firstName} ${user.lastName}`})
}))

// Create User Route
router.post('/users', asyncHandler(async(req, res) => {
    console.log(req.body)
    if (req.body.confirmedPassword === req.body.password) {
    try {
        await User.create(req.body);
        res.status(201).json({"message": "User created!"});
    } catch(error) {
        console.log('Error man!'), error.name;

        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({errors}) 
        } else {
                throw error;
            }
        }
    } else {
        res.json({msg: "Please make sure your passwords match!"})
    }
    }
    ))

// View All Courses Route
router.get('/courses', asyncHandler(async(req, res) => {
    try {
        const courses = await Course.findAll({
            include: [
                {
                    model: User,
                    as: 'courseOwner'
                },
            ],
        })
        res.status(200).json(courses.map(item => item.get({plain: true})))
    } catch(error) {
        console.log(error);
    }
}))

// View Individual Course Route
router.get('/courses/:id', asyncHandler(async(req, res) => {
    const courseId = req.params.id;
    console.log(courseId);
    try {
        const course = await Course.findOne({
            where: {id: courseId},
            include: [
                {
                    model: User,
                    as: 'courseOwner'
                },
            ]
        })

        res.json(course);
    } catch(error) {
        console.log("no good");
    }
}))

// Create new Courses Route
router.post('/courses', authenticateUser, asyncHandler(async(req, res) => {
    let courseEntry;
    try {
        courseEntry = await Course.create({
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded,
            userId: req.currentUserId
        });
        res.status(201);
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(courseEntry))
    } catch(error) {
        console.log('Error man!'), error.name;

        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({errors}) 
        } else {
                throw error;
            }
        }
    }
    ))

// Update Course Route
router.put('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {
    let courseEntry;
    try {
        courseEntry = await Course.findByPk(req.params.id);
        if (req.currentUserId !== courseEntry.userId) {
            res.status(403).json({msg: "You are not the owner of this route! Be gone!"})
        }
        if (courseEntry) {
            await courseEntry.update({
                title: req.body.title,
                description: req.body.description,
                estimatedTime: req.body.estimatedTime,
                materialsNeeded: req.body.materialsNeeded
            });
            res.status(204).end();
        } else {
            res.status(404).json("This route does not exist!")
        }
    } catch(error) {
        console.log('There seems to have been an error!'), error.name;

        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({errors}) 
        } else {
                throw error;
            }
        }
 }))

// Delete Course Route
router.post('/courses/:id/delete', authenticateUser, asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (req.currentUserId === course.userId) {
        await course.destroy();
        res.status(204).end();
    } else {
        res.status(400).json({msg: "I'm afraid you are not the owner of this course! Therefore you cannot delete it."})
    }
}))

module.exports = router;