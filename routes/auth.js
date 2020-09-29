const router = require('express').Router();
const User = require('../models/user');
const  { registerValidation } = require('../validation');

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

    //create user object and save it in Mongo (via try-catch)
    const user = new User( {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save(); //save user
        res.json( { error: null, data: savedUser } );
    } catch (error) {
        res.status(400).json( { error });
    }
    
});    

module.exports = router;