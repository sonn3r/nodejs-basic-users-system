const pool = require('../../db');
const queries = require('./queries');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const addUser = (req, res) => {
    const {name, email, age, dob} = req.body;

    // Check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.status(400).send("Email already exists.");
        } else
        // Add user to database
        pool.query(queries.addUser, [name, email, age, dob], (error, results) => {
            if (error) throw error;
            res.status(201).send("User added successfully.");
            console.log("user created");
        })
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
module.exports = {
    getUsers,
    getUserById,
    addUser,
};