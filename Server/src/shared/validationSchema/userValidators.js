/*
 * This file regroup all user validation schema
 */

import { body } from 'express-validator'

// Check on sign in
export const loginValidator = [
    body('user.email', 'Email can not be Empty').not().isEmpty(),
    body('user.email', 'Invalid email').isEmail(),
    body('user.password', 'Invalid does not Empty').not().isEmpty()
  ];

//Check on sign up
export const createValidator = [
    body('user.userName', 'username can not be Empty').not().isEmpty(),
    body('user.email', 'Email can not be Empty').not().isEmpty(),
    body('user.email', 'Invalid email').isEmail(),
    body('user.password', 'password can not be Empty').not().isEmpty(),
    body('user.confPassword', 'confPassword can not be Empty').not().isEmpty(),
    body('user.confPassword').custom((value, { req }) => {
        return value === req.body.user.password;
      })
  ];