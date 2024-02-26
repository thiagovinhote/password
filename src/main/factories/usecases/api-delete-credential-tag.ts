import { parseCookies } from "nookies";

import { ApiDeleteCredentialTag } from "~/data/usecases/api-delete-credential-tag";

import { makeAuthorizationHttpClient } from "../decorators";

export const makeApiDeleteCredentialTag = (
  mapCookies = parseCookies(),
): ApiDeleteCredentialTag => {
  return new ApiDeleteCredentialTag(makeAuthorizationHttpClient(mapCookies));
};
