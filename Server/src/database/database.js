/*
 * This file regroup method to interact with the database
 */

import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Start a connection with the database
const connectDB = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}).promise();

export default connectDB;

