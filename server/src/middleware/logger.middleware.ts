import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(
        `\x1b[32m[${req.method}] \x1b[0m${req.originalUrl} \x1b[90m${req.ip}\x1b[0m`,
    );
    res.on('finish', () => {
        switch (String(res.statusCode)[0]) {
            case '5':
                console.log(`   ↳\x1b[1;91m code [${res.statusCode}]\x1b[0m\n`);
                break;
            case '4':
                console.log(`   ↳ code \x1b[1;33m[${res.statusCode}]\x1b[0m\n`);
                break;
            default:
                console.log(`   ↳ code \x1b[1;96m[${res.statusCode}]\x1b[0m\n`);
                break;
        }
    });
    next();
}
