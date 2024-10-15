import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { renewAccessToken } from "../controller/auth/auth.controler";

export const VerifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies._acs || req.headers.authorization?.split('Bearer ')[1]!
        if (!accessToken) {
            const tokenRenewed = await renewAccessToken(req, res);
            if (tokenRenewed) {
                next();
            } else {
                return res.status(401).send({ message: 'unauthenticated' });
            }
        } else {
            const access_secret = process.env.JWT_ACCESS_TOKEN_SECRET!
            var { role } = jwt.verify(accessToken, access_secret) as { user_name: string; role: "admin" | "user" };
            req.role = role;
            next();
        }

    }
    catch (err) {
        if (err instanceof Error) {
            if (err?.message == 'jwt expired') {
                return res.status(401).send({ message: 'access token expaired' })
            }
            else if (err?.message == 'invalid signature') {
                return res.status(401).send({ message: 'unauthonicated' })
            }
            else {
                return res.status(500).send({ message: 'Internel server error' })
            }
        }
        else {
            return res.status(500).send({ message: 'Internel server error' })
        }
    }
}