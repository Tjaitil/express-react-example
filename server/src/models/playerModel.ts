import { Player } from "../shared/types/Player";
import { pool } from "../config/mysqlConnection";

const create = async (player: Player) => {
    return await pool.query("INSERT INTO players (summoner_name, role, team, country, age) VALUES(?, ?, ?, ?, ?)", [
        player.summoner_name,
        player.role,
        player.team,
        player.country,
        player.age,
    ]);
};

const get = async () => {
    return await pool.query("SELECT id, summoner_name, role, age, country, team from players");
};

const find = async (summonerName: string) => {
    return await pool.query("SELECT summoner_name from players WHERE summoner_name = ?", [summonerName]);
};

const destroy = async (summonerName: number) => {
    return await pool.query("DELETE FROM players WHERE summoner_name= ?"[summonerName]);
};

const update = async (player: Player) => {
    return await pool.query(
        "UPDATE players SET summoner_name=?, role=?, team=?, country=?, age=? WHERE summoner_name=?",
        [player.summoner_name, player.role, player.team, player.country, player.age, player.summoner_name]
    );
};

export { create, get, find, destroy, update };
