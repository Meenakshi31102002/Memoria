const db = require('../config/db');
const bcrypt = require('bcrypt');

// Register User
exports.register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, hashedPassword];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) reject(err);
            resolve(result.insertId);  // Return the ID of the newly inserted user
        });
    });
};

// Add Photo
exports.addPhoto = async (userId, imageUrl, description) => {
    const query = 'INSERT INTO photos (user_id, image_url, description) VALUES (?, ?, ?)';
    const values = [userId, imageUrl, description];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// Add Reminder
exports.addReminder = async (userId, title, description) => {
    const query = 'INSERT INTO reminders (user_id, title, description) VALUES (?, ?, ?)';
    const values = [userId, title, description];

    return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};
