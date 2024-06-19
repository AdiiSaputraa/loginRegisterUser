import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Perhatikan penggunaan .js pada akhir model

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email});
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            email,
            password,
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(200).json({ msg: 'User register succsessfull' });

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        res.status(200).json({ msg: 'Login successful' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

export default router; // Ekspor router dengan default
