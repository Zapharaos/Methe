/*
 * This file regroup all users endpoint
 */
import express from 'express';
import { validationResult } from 'express-validator';

import { STATUS_CODE_SUCCESS, STATUS_CODE_ERROR } from '../shared/enum/enumSendStatus.js';
import { createValidator, loginValidator } from '../shared/validationSchema/userValidators.js'

import { postUser, getAllUsers } from '../services/usersService.js'

export const usersRouter = express.Router();

// This allow you to read json from post request
usersRouter.use(express.json());

// Rout to create a user
usersRouter.post('/create', createValidator, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(STATUS_CODE_ERROR.DATA).json({message: errors});
    }

    const user = req.body.user;
    try 
    {
        await postUser(user.email, user.password, user.userName);
        return res.status(STATUS_CODE_SUCCESS.CREATE).json({message: 'The user is create'});
    } 
    catch (errors)
    {
        return res.status(STATUS_CODE_ERROR.DATA).json({message: 'The user can not be create', errors: errors});
    }
});

// Route test to check
usersRouter.get('/', async (req, res) => {
    return res.status(STATUS_CODE_SUCCESS.SUCCESS).json(await getAllUsers());
})