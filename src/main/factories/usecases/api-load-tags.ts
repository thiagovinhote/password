import { parseCookies } from 'nookies'
import { ApiLoadTags } from '~/data/usecases/api-load-tags'
import { makeAuthorizationHttpClient } from '../decorators'

export const makeApiLoadTags = (mapCookies = parseCookies()): ApiLoadTags => {
  return new ApiLoadTags(makeAuthorizationHttpClient(mapCookies))
}
