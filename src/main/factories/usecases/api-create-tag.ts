import { parseCookies } from 'nookies'
import { ApiCreateTag } from '~/data/usecases/api-create-tag'
import { makeAuthorizationHttpClient } from '../decorators'

export const makeApiCreateTag = (mapCookies = parseCookies()): ApiCreateTag => {
  return new ApiCreateTag(makeAuthorizationHttpClient(mapCookies))
}
