import { Request, Response } from 'express';
import db from '../../config/db';
import { validationResult } from "express-validator";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { addAccountType, editAccountType } from '../client/types';

export const allAccounts = async (req: Request<{}, {}, {}, { limit?: number, search?: string, current_page?: number }>, res: Response) => {
    try {
        const search = req.query.search ? req.query.search : '';
        const limit: number = req.query.limit ? Number(req.query.limit) : 10;
        const current_page = req.query.current_page ? Number(req.query.current_page) : 0;

        const sql_cmd = `select * from accounts where name like '%${search}%' or account_num like '%${search}%' or contact_person_phone like '%${search}%' limit ${current_page * limit}, ${limit}`;
        const [rows] = await db.execute<RowDataPacket[]>(sql_cmd)
        
        const count_sql = `select count(*) as total from accounts where name like '%${search}%' or account_num like '%${search}%' or contact_person_phone like '%${search}%'`;

        const [count] = await db.execute<RowDataPacket[]>(count_sql);

        res.send({ collections: rows, count }).status(200)
        
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}

export const addNewAccount = async (req: Request<{}, {}, addAccountType>, res: Response) => {
    try {
        const validatorRes = validationResult(req);
        if (!validatorRes.isEmpty()) {
            return res.status(400).send({
                message: "Please fill all valid input",
                errors: validatorRes.array().map((error) => error?.msg)
            });
        }

        const { name, balance = 0, contact_person_phone = null, account_num = null, description = null, created = 'CURRENT_TIMESTAMP' } = req.body;

         // check account already exist by name
         const [rows] = await db.execute<RowDataPacket[]>('select * from accounts where name = ?', [name]);

         if (rows.length > 0) {
             return res.status(400).send({ message: 'account already exist' });
         }

        const result = await db.execute<ResultSetHeader>('insert into accounts (name, balance, account_num, contact_person_phone, description, created) values (?,?,?,?,?,?)', [name, balance, account_num, contact_person_phone, description, created]);

        if(result[0].affectedRows <= 0){
            return res.status(400).send({ message: 'account create failed, try again' });
        }



        res.status(200).send({ message: 'New account added successfully' });
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}

export const EditAccount = async (req: Request<{id : string}, {}, editAccountType>, res: Response) => {
    try {
        const validatorRes = validationResult(req);
        if (!validatorRes.isEmpty()) {
            return res.status(400).send({
                message: "Please fill all valid input",
                errors: validatorRes.array().map((error) => error?.msg)
            });
        }

        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ message: 'account id is required' });
        }

        const { name, contact_person_phone = null, account_num = null, description = null } = req.body;

         // check account has already exist
         const [rows] = await db.execute<RowDataPacket[]>('select * from accounts where id = ?', [id]);

         if (rows.length <= 0) {
             return res.status(400).send({ message: 'account not found' });
         }

        const result = await db.execute<ResultSetHeader>('update accounts set name = ?, account_num = ?, contact_person_phone = ?, description = ?, updated = CURRENT_TIMESTAMP where id = ?', [name, account_num, contact_person_phone, description, id]);

        if(result[0].affectedRows <= 0){
            return res.status(400).send({ message: 'account update failed, try again' });
        }

        res.status(200).send({ message: 'Account updated successfully' });
    } catch (err) {
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}

export const deleteAccount = async (req: Request<{id : string}>, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ message: 'Account id is required' });
        }

        // check group already exist
        const [rows] = await db.execute<RowDataPacket[]>('select * from accounts where id = ?', [id]);

        if (rows.length === 0) {
            return res.status(400).send({ message: 'Account not found' });
        }

        // update group
         const result = await db.execute<ResultSetHeader>('delete from accounts where id = ?', [id]);

         if(result[0].affectedRows <= 0){
            return res.status(400).send({ message: 'Account delete failde, try again' });
         }

        res.status(200).send({ message: 'Account delete successfully' });

    } catch (err) {
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}