const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');
const  { registerValidation, loginValidation } = require('../validation');

router.post("/register", async (req, res) => {
    
    //validate user inputs (name, email, password)
    const { error } = registerValidation(req.body);
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    //check if email is already registeret
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        return res.status(400).json({ error: "Email already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    //create user o bject and save it in Mongo (via try-catch)
    const user = new User( {
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        const savedUser = await user.save(); //save user
        res.json( { error: null, data: savedUser._id } );
    } catch (error) {
        res.status(400).json( { error });
    }
    
});    

router.post("/login", async (req, res) => {
    
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({error : error.details[0].message });
    }
    
    const user = await User.findOne({ email: req.body.email });

    //throw error when email is wrong
    if (!user) {
        return res.status(400).json({ error: "Email is wrong" });
    }

    //check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(400).json({ error: "Password is wrong" })
    }

    res.json({
        error: null,
        data: {
            message: "Login Succesful"
        }
    });
    
})



module.exports = router;