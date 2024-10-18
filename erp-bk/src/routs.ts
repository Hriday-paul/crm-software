import express, { NextFunction, Request, Response } from 'express';
import { addClient, addClientGroup, allClients, allGroups, deleteClient, editClient } from './controller/client/client.controler';
import { addClientGroupValidator, addClientValidator } from './validator/client.validator';
import { File_Upload } from './helper/File_upload';
import { loginValidator } from './validator/auth.validator';
import { login } from './controller/auth/auth.controler';
import { VerifyUser } from './helper/VerifyUser';
import { Check_admin } from './helper/CheckAdmin';

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

export default router;