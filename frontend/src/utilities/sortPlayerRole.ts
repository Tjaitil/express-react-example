import { Player } from "../types/Player";

export const sortPlayerRole = (a: Player, b: Player) =>
  getPlayerRoleOrder(a["role"]) < getPlayerRoleOrder(b["role"]) ? -1 : 1;

const getPlayerRoleOrder = (value: string) => {
  let orderValue;

  switch (value) {
    case "toplaner":
      orderValue = 5;
      break;
    case "jungler":
      orderValue = 4;
      break;
    case "midlaner":
      orderValue = 3;
      break;
    case "botlaner":
      orderValue = 2;
      break;
    case "support":
      orderValue = 1;
    default:
      orderValue = 0;
      break;
  }
  return orderValue;
};
