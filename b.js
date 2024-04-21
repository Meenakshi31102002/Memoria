const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { register } = require('./user'); // Assuming user.js is in the same directory

const app = express();

// Middleware
app.use(bodyParser.json());

// Login Endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Here you would query the database to find the user with the given username
        // and compare the hashed password
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Return success message
        res.json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Dummy function to get user by username (Replace with actual database query)
async function getUserByUsername(username) {
    // Implement your database query here
    return {
        username: 'testUser',
        password: '$2b$10$R/.bTglt2wvPdQKq4ZlSg.7R4MDhPX2lMzbzRZ/n6s.RzwbI3ZECq' // bcrypt hash
    };
}

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
