import { AppState } from "../AppState";
import { api } from "./AxiosService";

class FlagsService {
  async getFlags(){
    const res = await api.get('api/ads')
    console.log(res.data)
    AppState.flags = res.data
  }
}

export const flagsService = new FlagsService();