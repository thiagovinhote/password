import { parseCookies } from "nookies";

import { ApiUpdateUserPicture } from "~/data/usecases/api-update-user-picture";

import { makeAuthorizationHttpClient } from "../decorators";

export const makeApiUpdateUserPicture = (
  mapCookies = parseCookies(),
): ApiUpdateUserPicture => {
  return new ApiUpdateUserPicture(makeAuthorizationHttpClient(mapCookies));
};
