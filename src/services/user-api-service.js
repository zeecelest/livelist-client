import config from '../config'
import TokenService from './token-service'

const UserApiService = {
    getUsersByName(name){
        return fetch(`${config.API_ENDPOINT}/user/${name}`, {
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
    },
    getUsersListByUserId(id){
        return fetch(`${config.API_ENDPOINT}/user/lists/${id}`, {
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