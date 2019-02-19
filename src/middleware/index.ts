import { Request, Response, NextFunction } from "express";

export function ensureAuthenticated (req: Request, res: Response, next: NextFunction): void {
  req.isAuthenticated()
    ? next()
    : res.status(401).send('This actions requires authentication, please login and try again')
}
