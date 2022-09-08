import express, { Express, Request, Response } from "express";

const app: Express = express();

const port = process.env.port || 8080;

app.get("/", (req: Request, res: Response) => {
    res.send("I'm alive");
});

app.get("/noob", (req: Request, res: Response) => {
    res.send("hello");
});

app.listen(port, () => console.log('tuyy'));

