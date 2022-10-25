import axios, { AxiosInstance } from "axios";
import { Player } from "../types/Player";

export class PlayerApi {
  private static axiosInstance: AxiosInstance;

  private static getAxios() {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        baseURL: "/api/player",
        // baseURL: "http://localhost:8080/player",
      });
    }

    return this.axiosInstance;
  }

  public static async post(data: Player) {
    return this.getAxios().post("", { player: data });
  }

  public static async get() {
    return this.getAxios().get("");
  }

  public static async put(data: Player) {
    return this.getAxios().put("", { player: data });
  }

  public static async delete(data: Player) {
    return this.getAxios().delete("", { data });
  }
}
