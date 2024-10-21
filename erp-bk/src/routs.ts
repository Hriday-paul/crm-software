import express, { NextFunction, Request, Response } from 'express';
import { addClient, addClientGroup, allClients, allGroups, deleteClient, deleteClientGroup, editClient, editClientGroup } from './controller/client/client.controler';
import { addClientGroupValidator, addClientValidator } from './validator/client.validator';
import { File_Upload } from './helper/File_upload';
import { loginValidator } from './validator/auth.validator';
import { login } from './controller/auth/auth.controler';
import { VerifyUser } from './helper/VerifyUser';
import { Check_admin } from './helper/CheckAdmin';
import { addNewAccount, allAccounts, deleteAccount, EditAccount } from './controller/account/accounts.controler';
import { addAccountValidator } from './validator/accounts.validator';

const router = express.Router();

router.post('/post', (req:Request, res:Response)=>{
    res.status(200).send({message : 'ok message'})
})

router.post('/auth/login', File_Upload().none(), loginValidator, login);

router.get('/clients', VerifyUser, Check_admin, allClients);
router.post('/clients', VerifyUser, Check_admin, File_Upload().single('client_photo'), addClientValidator, addClient);
router.put('/clients/:id', VerifyUser, Check_admin, File_Upload().single('client_photo'), addClientValidator, editClient);
router.delete('/clients/:id', VerifyUser, Check_admin, deleteClient);

router.get('/client-groups', VerifyUser, Check_admin, allGroups);
router.post('/client-groups', VerifyUser, Check_admin, File_Upload().none(), addClientGroupValidator, addClientGroup);
router.put('/client-groups/:id', VerifyUser, Check_admin, File_Upload().none(), addClientGroupValidator, editClientGroup);
router.delete('/client-groups/:id', VerifyUser, Check_admin, deleteClientGroup);


// -----------account-------------
router.get('/accounts', VerifyUser, Check_admin, allAccounts);
router.post('/accounts', VerifyUser, Check_admin, File_Upload().none(), addAccountValidator, addNewAccount);
router.put('/accounts/:id', VerifyUser, Check_admin, File_Upload().none(), addAccountValidator, EditAccount);
router.delete('/accounts/:id', VerifyUser, Check_admin, deleteAccount);

export default router;