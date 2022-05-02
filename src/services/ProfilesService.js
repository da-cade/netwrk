import { AppState } from "../AppState"
import { api } from "./AxiosService"

class ProfilesService {
  async getMyProfile(id){
    const res = await api.get('api/profiles/' + id)
    AppState.myProfile = res.data
 }
  async getProfile(id){
   const res = await api.get('api/profiles/'+id)
   AppState.activeProfile = res.data
 }
 async getByQuery(params){
  const res = await api.get('api/profiles?query=' + params )
  AppState.foundProfiles = res.data
 }
}

export const profilesService = new ProfilesService()