import { parseCookies } from "nookies";

import { ApiCreateCredentialTag } from "~/data/usecases/api-create-credential-tag";

import { makeAuthorizationHttpClient } from "../decorators";

export const makeApiCreateCredentialTag = (
  mapCookies = parseCookies(),
): ApiCreateCredentialTag => {
  return new ApiCreateCredentialTag(makeAuthorizationHttpClient(mapCookies));
};
