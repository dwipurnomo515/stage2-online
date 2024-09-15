import { Request, Response } from "express";
import { sayHello } from "../services/hello.service";


export function HelloController(req: Request, res: Response) {
    const hello = sayHello();
    res.send(`${hello}`);

}