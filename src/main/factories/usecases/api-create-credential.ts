import { parseCookies } from 'nookies'
import { ApiCreateCredential } from '~/data/usecases/api-create-credential'
import { makeAuthorizationHttpClient } from '../decorators'

export const makeApiCreateCredential = (
  mapCookies = parseCookies()
): ApiCreateCredential => {
  return new ApiCreateCredential(makeAuthorizationHttpClient(mapCookies))
}
