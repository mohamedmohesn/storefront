import jwt from 'jsonwebtoken';
import { Request, Response , NextFunction } from 'express'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN as string)
        console.log(decoded)
        next()
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}

