import {check} from 'express-validator';

export const loginValidator = [
    check('user_name').trim().escape().not().isEmpty().withMessage('user name is required').isString(),
    check('password').trim().escape().not().isEmpty().withMessage('password is required').isString(),
]
