import {check} from 'express-validator';

export const addClientValidator = [
    check('name').trim().escape().not().isEmpty().withMessage('Name is required').isString().isLength({min:3}).withMessage('Name min length is 3'),
    check('email').optional().trim().escape().isEmail().normalizeEmail({all_lowercase : true}) .withMessage('Invalid Email'),
    check('phone').optional().trim().escape().isMobilePhone('any').withMessage('Invalid phone number'),
    check('address').optional().trim().escape().isString().isLength({min:3}).withMessage('address min length is 3'),
    check('city').optional().trim().escape().isString().isLength({min:3}).withMessage('city min length is 3'),
    check('post_code').optional().trim().escape().isString().withMessage('Invalid post code'),
    check('country').optional().trim().escape().isString().isLength({min:3}).withMessage('country min length is 3'),
    check('company').optional().trim().escape().isString().isLength({min:3}).withMessage('company min length is 3'),
    check('group_id').optional().trim().escape().isNumeric().withMessage('group id invalid type'),
    check('previous_due').optional().trim().escape().isNumeric().withMessage('previous due invalid format'),
    check('refference').optional().trim().escape(),
    check('description').optional().trim().escape()
]

export const addClientGroupValidator = [
    check('name').trim().escape().not().isEmpty().withMessage('Name is required').isString().isLength({min:3}).withMessage('Name min length is 3'),
    check('description').optional().trim().escape().isString(),
]