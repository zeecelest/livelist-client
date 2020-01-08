import config from '../config'
import TokenService from './token-service'

const UserApiService = {
    getUsersByName(name){
        fetch(`${config.API_ENDPOINT}/users/${name}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
        )     
    }
}

export default UserApiService;