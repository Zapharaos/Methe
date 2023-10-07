/*
 * This file regroup all users methods
 */

import { createUser, getUsers } from '../services/management/usersManagement.js';
import { StatusInformation } from '../shared/class/informationTrasmission.js';
import { STATUS_CODE_SUCCESS, STATUS_CODE_ERROR } from '../shared/enum/enumSendStatus.js';

// User class 
class User {
    userId;
    userName;
    email;

    constructor (id, email, userName){
        this.userId = id;
        this.email = email;
        this.userName = userName;
    }
}

// Method to call the database and add a new user
export async function postUser(email, password, userName){
    return await createUser(email, password, userName);
}

// Method to call the database and get all users
export async function getAllUsers(){
    const results = await getUsers();
    const usersList = [];
    
    results.forEach(element => {
        usersList.push(new User(element.userId, element.email, element.userName));
    });

    return usersList;
}