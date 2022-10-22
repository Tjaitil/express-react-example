import { Request, Response } from "express";
import { Player } from "../shared/types/Player";
import * as playerModel from "../models/playerModel";

const post = async (req: Request, res: Response) => {
  const player = req.body.player as Player;
  await playerModel
    .create(player)
    .then(([rows, field]) => res.send(player))
    .catch((error) => res.status(500).send("An error has occured"));
};

const get = async (req: Request, res: Response) => {
  await playerModel
    .get()
    .then(([rows, fields]) => res.send(rows))
    .catch((error) => res.status(500).send("An error has occured"));
};

const put = async (req: Request, res: Response) => {
  const player = req.body.player as Player;
  await playerModel
    .update(player)
    .then(([rows, fields]) => res.send(player))
    .catch((error) => res.status(500).send("An error has occured"));
};

const destroy = async (req: Request, res: Response) => {
  await playerModel
    .get()
    .then(([rows, fields]) => res.send(rows))
    .catch((error) => res.status(500).send("An error has occured"));
};

export { post, get, put, destroy };
