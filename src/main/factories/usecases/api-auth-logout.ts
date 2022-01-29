import { ApiAuthLogout } from '~/data/usecases/api-auth-logout'
import { parseCookies } from 'nookies'
import { makeAuthorizationHttpClient } from '../decorators'

export const makeApiAuthLogout = (
  mapCookies = parseCookies()
): ApiAuthLogout => {
  return new ApiAuthLogout(makeAuthorizationHttpClient(mapCookies))
}
