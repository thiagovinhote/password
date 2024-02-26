import { parseCookies } from "nookies";

import { ApiDeleteCredential } from "~/data/usecases/api-delete-credential";

import { makeAuthorizationHttpClient } from "../decorators";

export const makeApiDeleteCredential = (
  mapCookies = parseCookies(),
): ApiDeleteCredential => {
  return new ApiDeleteCredential(makeAuthorizationHttpClient(mapCookies));
};
