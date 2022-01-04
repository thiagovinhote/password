import { parseCookies } from 'nookies'
import { ApiCreateFolder } from '~/data/usecases/api-create-folder'
import { makeAuthorizationHttpClient } from '../decorators'

export const makeApiCreateFolder = (
  mapCookies = parseCookies()
): ApiCreateFolder => {
  return new ApiCreateFolder(makeAuthorizationHttpClient(mapCookies))
}
