const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        console.log(newUser)
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};

// Login User
loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(403).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '3y' });
        
        console.log("logged in success")
        res.status(200).json({ token });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' });
    }
};

getProfile = async (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized', success: false })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false })
        }

        res.status(200).json({ message: 'User profile', success: true, user })
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', success: false })
    }
}


module.exports = {
    registerUser,
    loginUser,
    getProfile
}
