import { parseCookies } from "nookies";

import { ApiRevealCredential } from "~/data/usecases/api-reveal-credential";

import { makeAuthorizationHttpClient } from "../decorators";

export const makeApiRevealCredential = (
  mapCookies = parseCookies(),
): ApiRevealCredential => {
  return new ApiRevealCredential(makeAuthorizationHttpClient(mapCookies));
};
