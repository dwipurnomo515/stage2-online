import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { routerV1 } from "./routes/v1";
import { routerV2 } from "./routes/v2";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err); // Log error untuk debugging
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ message });
});

app.use("/api/v1", routerV1);
app.use("/api/v2", routerV2);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});