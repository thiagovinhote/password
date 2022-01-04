import { parseCookies } from "nookies"
import { ApiRetrieveCredential } from "~/data/usecases/api-retrieve-credential"
import { makeAuthorizationHttpClient } from "../decorators"

export const makeApiRetrieveCredential = (mapCookies = parseCookies()) => {
  return new ApiRetrieveCredential(makeAuthorizationHttpClient(mapCookies))
}
