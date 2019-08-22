const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation');



router.post('/register', async (req, res) => {
    //validate before create a user
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).send(res.send(error.details[0].message));
    //check the user has already in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');


    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const saveUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }

});

//Login 
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send(res.send(error.details[0].message));
    //check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not found');
    //password is correct

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return status(400).send('Invalid password');

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, abcdefgh);
    res.header('auth-token', token).send(token);


});

module.exports = router;