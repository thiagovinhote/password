import { ApiAuthLogin } from "~/data/usecases/api-auth-login";
import { FetchHttpClient } from "~/infra/http-client/fetch-http-client";

import { makeBaseApi } from "../http/base-api";

export const makeApiAuthLogin = (): ApiAuthLogin => {
  return new ApiAuthLogin(new FetchHttpClient(makeBaseApi()));
};
