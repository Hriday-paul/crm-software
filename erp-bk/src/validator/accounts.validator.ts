import {check} from 'express-validator';

export const addAccountValidator = [
    check('name').trim().escape().not().isEmpty().withMessage('Name is required').isString().isLength({min:3}).withMessage('Name min length is 3'),
    check('balance').optional().trim().escape().isNumeric().withMessage('invalid balance format'),
    check('account_num').optional().trim().escape().isString().withMessage('Invalid account number'),
    check('created').optional().trim().isISO8601().toDate()
            .withMessage("Invalid date received"),
    check('contact_person_phone').optional().trim().escape().isMobilePhone('any').withMessage('Invalid phone number'),
    check('description').optional().trim().escape()
]