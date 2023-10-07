/*
 * This file regroup all methods use to interact with the users table
 */

import connectDB from '../../database/database.js';

// SQL queries
const INSERT_USER = `INSERT INTO users (email, password, userName) VALUES (?, ?, ?);`;

// Method to create a user
export async function createUser(email, password, userName){
    return await connectDB.execute(INSERT_USER, [email, password, userName]);
}

// Method to get all users
export async function getUsers() {
    const results =  await connectDB.query(`SELECT userId, email, userName FROM users;`);
    return results[0];
}
