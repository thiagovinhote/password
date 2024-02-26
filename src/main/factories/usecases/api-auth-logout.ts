import { parseCookies } from "nookies";

import { ApiAuthLogout } from "~/data/usecases/api-auth-logout";

import { makeAuthorizationHttpClient } from "../decorators";

export const makeApiAuthLogout = (
  mapCookies = parseCookies(),
): ApiAuthLogout => {
  return new ApiAuthLogout(makeAuthorizationHttpClient(mapCookies));
};
