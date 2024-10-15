import express, { NextFunction, Request, Response } from 'express';
import { addClient, addClientGroup, allClients, allGroups } from './controller/client/client.controler';
import { addClientGroupValidator, addClientValidator } from './validator/client.validator';
import { File_Upload } from './helper/File_upload';
import { loginValidator } from './validator/auth.validator';
import { login } from './controller/auth/auth.controler';
import { VerifyUser } from './helper/VerifyUser';

const router = express.Router();

router.post('/post', (req:Request, res:Response)=>{
    res.status(200).send({message : 'ok message'})
})

router.post('/auth/login', File_Upload().none(), loginValidator, login);

router.get('/clients', VerifyUser, allClients)
router.post('/clients', VerifyUser, File_Upload().single('client_photo'), addClientValidator, addClient);
router.get('/client-groups', VerifyUser, allGroups)
router.post('/client-groups', VerifyUser, File_Upload().none(), addClientGroupValidator, addClientGroup);

export default router;