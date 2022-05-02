import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { profilesService } from "./ProfilesService"

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
      await profilesService.getMyProfile(res.data.id)
      console.log(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async submitEdits(formData){
    const res = await api.put('/account', formData)
    AppState.account = res.data
   }
}

export const accountService = new AccountService()
