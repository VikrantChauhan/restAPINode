const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./../config/key');
// +++++ load user model +++++
const Student = require('../models/Student');
// @routes  GET /api/user/test
// @desc    Test usrs
// @access  public
router.get('/test',(req,res)=>{
    res.json({
        msg : 'user worked'
    })
});

// @routes  POST /api/user/register
// @desc    register a user
// @access  public
router.post('/register', (req,res)=> {
    Student.findOne({ email: req.body.email}).then(user =>{
        if(user){
            res.status(200).json({
                success: false,
                message: 'Email already exist'
            });
        }
        else{
            const newUser = new Student({
                email: req.body.email,
                password: req.body.password,
                name: user.name
            })

            newUser.save().then((user) =>{
                res.status(200).json({
                    success: true,
                    message: 'User created',
                    data: user
                });
            }).catch(err => console.log(err));
        }
    })
})

// @routes  POST /api/user/login
// @desc    login a user
// @access  public
router.post('/login', (req,res)=> {
    const { email, password } = req.body;
    Student.findOne({ email, password },{ password : 0 }).then(user =>{
        if(user){
            let payload = {
                email: user.email,
                id: user._id,
                createdAt: user.date,
                name: user.name
            }
            var token = jwt.sign(payload,config.secret, {
                expiresIn: '24h' // expires in 24 hours
            });
            res.status(200).json({
                success: true,
                message: 'User authenticated',
                token
            });
        }
        else{
            res.status(200).json({
                success: false,
                message: 'Wrong email or password'
            });
        }
    })
})

module.exports = router;
