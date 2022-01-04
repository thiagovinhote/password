import { parseCookies } from 'nookies'
import { ApiLoadCredentials } from '~/data/usecases/api-load-credentials'
import { makeAuthorizationHttpClient } from '../decorators'

export const makeApiLoadCredentials = (
  mapCookies = parseCookies()
): ApiLoadCredentials => {
  return new ApiLoadCredentials(makeAuthorizationHttpClient(mapCookies))
}
