import { FetchHttpClient } from '~/infra/http-client/fetch-http-client'
import { AuthorizationHttpClient } from '~/main/decorators'
import { makeBaseApi } from '../http/base-api'

export const makeAuthorizationHttpClient = (
  mapCookies: Record<string, string>
) => {
  return new AuthorizationHttpClient(
    new FetchHttpClient(makeBaseApi()),
    mapCookies
  )
}
