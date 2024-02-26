import { parseCookies } from "nookies";

import { ApiUpdateCredential } from "~/data/usecases/api-update-credential";

import { makeAuthorizationHttpClient } from "../decorators";

export const makeApiUpdateCredential = (
  mapCookies = parseCookies(),
): ApiUpdateCredential => {
  return new ApiUpdateCredential(makeAuthorizationHttpClient(mapCookies));
};
