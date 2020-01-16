import config from '../config'
import TokenService from './token-service'
import { taggedTemplateExpression } from '@babel/types'

const SpotsApiService = {
    postSpots(spot) {
        return fetch(`${config.API_ENDPOINT}/spots`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(spot),
        })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    deleteSpots(id){
        return fetch(`${config.API_ENDPOINT}/spots/${id}`,{
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
              id: id
            })
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : null
            )
    },
    patchSpot(spot) {
      console.log(spot.name, spot.tags,spot.address,spot.city, spot.state, spot.list_id)
      return fetch(`${config.API_ENDPOINT}/spots/${spot.id}`,{
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        name: spot.name,
        tags: spot.tags,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        list_id: spot.list_id
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
    }
}

export default SpotsApiService;