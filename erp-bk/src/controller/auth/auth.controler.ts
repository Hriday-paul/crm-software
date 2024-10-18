import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import db from '../../config/db'
import { Request, Response } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { validationResult } from 'express-validator';

interface IUser extends RowDataPacket {
    id: number
    user_name: string
    password: string
    role: "admin" | "user";
    rfc_token: string
}

export const login = async (req: Request<{}, {}, { user_name: string; password: string }>, res: Response) => {
    try {
        const validatorRes = validationResult(req);
        if (!validatorRes.isEmpty()) {
            return res.status(400).send({
                message: "Please fill all valid input",
                errors: validatorRes.array().map((error) => error?.msg)
            });
        }

        const { user_name, password } = req.body;

        const [rows] = await db.execute<IUser[]>(`select * from auth where user_name = ?`, [user_name])

        if (rows.length <= 0) {
            return res.status(403).send({ message: 'account not found' })
        };

        const matchPassword = await bcrypt.compare(password, rows[0]?.password);

        if (!matchPassword) {
            return res.status(403).send({ message: 'password not match' })
        }

        const access_secret = process.env.JWT_ACCESS_TOKEN_SECRET!;
        const refresh_secret = process.env.JWT_REFRESH_TOKEN_SECRET!;
        const accessToken = jwt.sign({ user_name: rows[0]?.user_name, role: rows[0]?.role }, access_secret, { expiresIn: 60 * 5 }) // 5 minute
        const refreshToken = jwt.sign({ user_name: rows[0]?.user_name, role: rows[0]?.role }, refresh_secret, { expiresIn: 24 * 60 * 60 * 3 }) //3 days expairy time

        // add refreshToken in user db
        const result = await db.execute<ResultSetHeader>(`update auth set rfc_token = ? where user_name = ?`, [refreshToken, rows[0]?.user_name]);

        if (result[0].affectedRows === 0) {
            return res.status(500).send({ message: 'Internal Server Error' })
        }

        res.status(200)
            .cookie("_rfc", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 3,
                // sameSite: 'none'
            }).cookie("_acs", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 5, // 5 minutes
                // sameSite: 'none'
            })
            .send({
                accessToken,
                user: {
                    user_name: rows[0]?.user_name,
                    role: rows[0]?.role,
                },
                message: 'login successfully'
            });
    }
    catch (err) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

export const renewAccessToken = async (req: Request, res: Response) => {
    try {

        const refreshToken = req.cookies._rfc || req.headers.authorization?.split('Bearer ')[1];

        if (!refreshToken) {
            return false;
        }
        else {
            const refresh_secret = process.env.JWT_REFRESH_TOKEN_SECRET!
            const { user_name } = jwt.verify(refreshToken, refresh_secret) as { user_name: string; role: 'admin' | 'user' };

            const [rows] = await db.execute<IUser[]>(`select * from auth where user_name = ?`, [user_name]);

            if (rows.length <= 0) {
                return false;
            }
            if (rows[0].rfc_token !== refreshToken) {
                return false;
            }
            if (rows[0].role !== 'admin') {
                return false;
            }

            const access_secret = process.env.JWT_ACCESS_TOKEN_SECRET!;
            const newaccessToken = jwt.sign({ user_name: rows[0]?.user_name, role: rows[0].role }, access_secret, { expiresIn: 60 * 5 }) // 5 minute
            const newrefreshToken = jwt.sign({ user_name: rows[0]?.user_name, role: rows[0].role }, refresh_secret, { expiresIn: 24 * 60 * 60 * 3 });

            // add refreshToken in user db
            await db.execute<ResultSetHeader>(`update auth set rfc_token = ? where user_name = ?`, [newrefreshToken, rows[0]?.user_name]);

            res.cookie("_rfc", newrefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 3,
                // sameSite: 'none'
            }).cookie("_acs", newaccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 5, // 5 minutes
                // sameSite: 'none'
            })
            req.role = rows[0].role;
        }
        return true;

    } catch (err) {
        console.log(err)
        if (err instanceof Error) {
            if (err?.message == 'jwt expired') {
                return res.status(401).send({ message: 'refresh token expaired' })
            }
            else if (err?.message == 'invalid signature') {
                return res.status(401).send({ message: 'unauthonicated' })
            }
            else return res.status(500).send({ message: 'Internel server error' })
        }
        else {
            return res.status(500).send({ message: 'Internel server error' })
        }
    }
}