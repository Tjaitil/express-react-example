import { Request, Response, NextFunction } from "express";
import { check, checkSchema, CustomValidator, validationResult } from "express-validator";
import { Schema } from "express-validator/src/middlewares/schema";
import { find } from "../../models/playerModel";
import { Roles } from "../../shared/types/Roles";

const validatePlayerSchema: Schema = {
  "player.summoner_name": {
    isString: true,
    notEmpty: true,
  },
  "player.country": {
    isString: true,
    notEmpty: true,
    errorMessage: "country must be string",
  },
  "player.team": {
    notEmpty: true,
    errorMessage: "team must be string",
  },
  "player.age": {
    notEmpty: true,
    custom: {
      options: (value) => Number(value) >= 18,
    },
  },
  "player.role": {
    isString: true,
    custom: {
      options: (value) => Object.values(Roles).includes(value),
    },
    errorMessage: "Not valid role",
  },
};

const checkValidateResult = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

const validatePlayer = [
  checkSchema(validatePlayerSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const isValidPlayer: CustomValidator = (val) => {
  return find(val).then(([rows, fields]) => {
    if (Array.isArray(rows) && rows.length === 0) {
      return Promise.reject("Summoner_name does not exists!");
    }
  });
};

const isPlayerRegistered: CustomValidator = (val) => {
  return find(val).then(([rows, fields]) => {
    if (Array.isArray(rows) && rows.length > 0) {
      return Promise.reject("Summoner_name already exists!");
    }
  });
};

const validateAlreadyRegistered = [
  check("player.summoner_name").isString().bail().custom(isPlayerRegistered),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const validatePlayerSummoner = [
  check("player.summoner_name").isString().bail().custom(isValidPlayer),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export { validatePlayer, validatePlayerSummoner, validateAlreadyRegistered, validatePlayerSchema, checkValidateResult };
