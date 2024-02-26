import { ApiAuthRegister } from "~/data/usecases/api-auth-register";
import { FetchHttpClient } from "~/infra/http-client/fetch-http-client";

import { makeBaseApi } from "../http/base-api";

export const makeApiAuthRegister = (): ApiAuthRegister => {
  return new ApiAuthRegister(new FetchHttpClient(makeBaseApi()));
};
