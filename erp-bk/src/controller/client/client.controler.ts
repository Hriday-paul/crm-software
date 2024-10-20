import { Request, Response } from "express";
import db from '../../config/db'
import { addClientGroupType, addClientType } from "./types";
import { validationResult } from "express-validator";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const allClients = async (req: Request<{}, {}, {}, { limit?: number, search?: string, current_page?: number }>, res: Response) => {
    try {
        const search = req.query.search ? req.query.search : '';
        const limit: number = req.query.limit ? Number(req.query.limit) : 10;
        const current_page = req.query.current_page ? Number(req.query.current_page) : 0;

        const sql_cmd = `select cls.id, cls.name, cls.email, cls.phone, cls.address, cls.city, cls.company_name as company, cls.country, cls.post_code, cls.refference, cls.description, cls.photo, cls.previous_due, cls.created, cls.updated, clg.id as group_id, clg.name as group_name from clients cls left join client_groups clg on cls.group_id = clg.id where cls.name like '%${search}%' or cls.email like '%${search}%' or cls.phone like '%${search}%' or cls.address like '%${search}%' or cls.city like '%${search}%' or cls.company_name like '%${search}%' or cls.country like '%${search}%' or cls.post_code like '%${search}%' or cls.refference like '%${search}%' or cls.description like '%${search}%' limit ${current_page * limit}, ${limit}`;

        const [rows] = await db.execute(sql_cmd)

        const count_sql = `select count(*) as total from clients where name like '%${search}%' or email like '%${search}%' or phone like '%${search}%' or address like '%${search}%' or city like '%${search}%' or company_name like '%${search}%' or country like '%${search}%' or post_code like '%${search}%' or refference like '%${search}%' or description like '%${search}%'`;

        const [count] = await db.execute(count_sql);

        res.send({ collections: rows, count }).status(200)

    } catch (err) {
        console.log(err)
        res.send({ message: 'something went wrong, try again.' }).status(400)
    }
}

export const addClient = async (req: Request<{}, {}, addClientType>, res: Response) => {
    try {
        const validatorRes = validationResult(req);
        if (!validatorRes.isEmpty()) {
            return res.status(400).send({
                message: "Please fill all valid input",
                errors: validatorRes.array().map((error) => error?.msg)
            });
        }
        const photo = req.file?.filename ? '/images/' + req.file.filename : null;

        const { name, email = null, phone = null, address = null, city = null, company = null, country = null, description = null, group_id = null, post_code = null, previous_due = 0, refference = null } = req.body;

        // check if group_id is valid
        if (group_id) {
            const [group] = await db.execute('select * from client_groups where id = ?', [group_id]) as [any, { name: string }[]];
            if (group.length === 0) {
                return res.status(404).send({ message: 'Group not found' });
            }
        }

        await db.execute('insert into clients (name, email, phone, address, city, company_name, country, description, group_id, post_code, previous_due, refference, photo) values (?,?,?,?,?,?,?,?,?,?,?,?,?)', [name, email, phone, address, city, company, country, description, group_id, post_code, previous_due, refference, photo]);

        res.status(200).send({ message: 'New Client added successfully' });
    } catch (err) {
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}

export const editClient = async (req: Request<{ id: string }, {}, addClientType>, res: Response) => {
    try {
        const validatorRes = validationResult(req);
        if (!validatorRes.isEmpty()) {
            return res.status(400).send({
                message: "Please fill all valid input",
                errors: validatorRes.array().map((error) => error?.msg)
            });
        }
        const id = req.params.id;
        const photo = req.file?.filename ? '/images/' + req.file.filename : null;

        const { name, email = null, phone = null, address = null, city = null, company = null, country = null, description = null, group_id = null, post_code = null, previous_due = 0, refference = null } = req.body;

        if (!id) {
            return res.status(400).send({ message: 'Client id is required' });
        }

        // check if group_id is valid
        if (group_id) {
            const [group] = await db.execute('select * from client_groups where id = ?', [group_id]) as [any, { name: string }[]];
            if (group.length === 0) {
                return res.status(404).send({ message: 'Group not found' });
            }
        }

        let sql = `update clients 
            set name = ?, 
            email = ?, 
            phone = ?, 
            address = ?, 
            city = ?, 
            company_name = ?, 
            country = ?, 
            description = ?, 
            group_id = ?, 
            post_code = ?, 
            previous_due = ?, 
            refference = ?`;

        const updatedDataAry = [name, email, phone, address, city, company, country, description, group_id, post_code, previous_due, refference];

        if (photo) {
            sql += ', photo = ? where id = ?';
            updatedDataAry.push(photo, parseInt(id));
        } else {
            sql += ' where id = ?';
            updatedDataAry.push(parseInt(id));
        }
        
        await db.execute(sql, updatedDataAry);

        res.status(200).send({ message: 'Client edited successfully' });
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}

export const deleteClient = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ message: 'Client id is required' });
        }
        
        const [rows] = await db.execute('select * from clients where id = ?', [id]) as [any, { name: string }[]];

        if(rows.length === 0){
            return res.status(404).send({ message: 'Client not found xx' });
        }
        let sql = `delete from clients where id = ?`;
        const result = await db.execute<ResultSetHeader>(sql, [id]);

        if (result[0].affectedRows === 0 ) {
            return res.status(404).send({ message: 'Client not found' });
        }

        res.status(200).send({ message: 'client delete successfully' });
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}


// -----------------groups---------------

export const allGroups = async (req: Request, res: Response) => {
    try {
        const search = req.query.search ? req.query.search : '';
        const sql_cmd = `select * from client_groups where name like '%${search}%'`;
        const [rows] = await db.execute(sql_cmd)
        res.status(200).send(rows)
    } catch (err) {
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}

export const addClientGroup = async (req: Request<{}, {}, addClientGroupType>, res: Response) => {
    try {
        const validatorRes = validationResult(req);
        if (!validatorRes.isEmpty()) {
            return res.status(400).send({
                message: "Please fill all valid input",
                errors: validatorRes.array().map((error) => error?.msg)
            });
        }
        const { name, description = null } = req.body;

        // check group already exist
        const [rows] = await db.execute<RowDataPacket[]>('select * from client_groups where name = ?', [name]);

        if (rows.length > 0) {
            return res.status(400).send({ message: 'Group already exist' });
        }

        // create new group
        await db.execute('insert into client_groups (name, description) values (?,?)', [name, description]);
        res.status(200).send({ message: 'Group create successfully' });

    } catch (err) {
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}

export const editClientGroup = async (req: Request<{id : string}, {}, addClientGroupType>, res: Response) => {
    try {
        const validatorRes = validationResult(req);
        if (!validatorRes.isEmpty()) {
            return res.status(400).send({
                message: "Please fill all valid input",
                errors: validatorRes.array().map((error) => error?.msg)
            });
        }
        const id = req.params.id;
        const { name, description = null } = req.body;

        if (!id) {
            return res.status(400).send({ message: 'Group id is required' });
        }

        // check group already exist
        const [rows] = await db.execute<RowDataPacket[]>('select * from client_groups where id = ?', [id]);

        if (rows.length === 0) {
            return res.status(400).send({ message: 'Group not found' });
        }

        // update group
         await db.execute<ResultSetHeader>('update client_groups set name = ?, description = ?, updated = CURRENT_TIMESTAMP where id = ?', [name, description, id]);

        res.status(200).send({ message: 'Group update successfully' });

    } catch (err) {
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}

export const deleteClientGroup = async (req: Request<{id : string}>, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({ message: 'Group id is required' });
        }

        // check group already exist
        const [rows] = await db.execute<RowDataPacket[]>('select * from client_groups where id = ?', [id]);

        if (rows.length === 0) {
            return res.status(400).send({ message: 'Group not found' });
        }

        // update group
         await db.execute<ResultSetHeader>('delete from client_groups where id = ?', [id]);

        res.status(200).send({ message: 'Group delete successfully' });

    } catch (err) {
        res.status(400).send({ message: 'something went wrong, try again.' })
    }
}
