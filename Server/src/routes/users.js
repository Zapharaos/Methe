/*
 * This file regroup all users endpoint
 */
import express from 'express';
import { STATUS_CODE_SUCCESS, STATUS_CODE_ERROR } from './../shared/enum/enumSendStatus.js';
import { createUser, getUsers } from '../services/management/usersManagement.js';

export const usersRouter = express.Router();

//This allow you to read json from post request
usersRouter.use(express.json());

//Rout to create a user
usersRouter.post('/create', async (req, res) => {
    const user = req.body.user;
    console.log(req.body);
    if(!user){
        return res.sendStatus(STATUS_CODE_ERROR.DATA).json({message: 'Error : the informations of the user is not present'});
    }
    
    try {
        await createUser(user.userLogin, user.userPassword);
        return res.status(STATUS_CODE_SUCCESS.CREATE).json({message: 'The user is create'});
    } catch (errors){
        return res.status(STATUS_CODE_ERROR.DATA).json({message: 'The user can not be create',
                                                        error: errors});
    }
});

usersRouter.get('/', async (req, res) => {
    return res.status(STATUS_CODE_SUCCESS.SUCCESS).json(await getUsers());
})