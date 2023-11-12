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

const removeUser = (req, res) => {
    const id = parseInt(req.params.id);

    // Remove user from database
    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        // Check if user exists
        if (!results.rows.length) {
            res.status(400).send("User does not exist in the database.");
        } else
            pool.query(queries.removeUser, [id], (error, results) => {
                if (error) throw error;
                res.status(301).send("User removed successfully.");
            })
    })
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {name} = req.body;

    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        // Check if user exists
        if (!results.rows.length) {
            res.status(400).send("User does not exist in the database.");
        } else
            pool.query(queries.updateUser, [name, id], (error, results) => {
                if (error) throw error;
                res.status(200).send("User updated successfully.");
            })
    })
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    removeUser,
    updateUser,
};