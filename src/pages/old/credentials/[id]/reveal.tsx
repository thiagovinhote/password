import { useMemo } from "react";

import { PlainObject, ReadonlyRequired } from "~/domain/fields/plain-object";
import { Credential } from "~/domain/models/credential";
import { Password } from "~/domain/models/password";
import {
  makeApiRetrieveCredential,
  makeApiRevealCredential,
} from "~/main/factories/usecases";
import { ssrAuth } from "~/presentation/helpers";
import { RevealTemplate } from "~/presentation/templates/credentials/[id]/reveal";

type Props = {
  password: ReadonlyRequired<Password>;
  credential: ReadonlyRequired<Credential>;
};

export default function Page(props: Props) {
  const deserialized = useMemo(() => {
    return {
      credential: PlainObject.deserializer(Credential.create, props.credential),
      password: PlainObject.deserializer(Password.create, props.password),
    };
  }, [props.credential, props.password]);

  return <RevealTemplate {...deserialized} />;
}

export const getServerSideProps = ssrAuth<Props, { id: string }>(
  async (context) => {
    const apiRetrieveCredential = makeApiRetrieveCredential(
      context.req.cookies,
    );
    const apiRevealCredential = makeApiRevealCredential(context.req.cookies);

    const credentialResult = await apiRetrieveCredential.exec({
      id: context.params.id,
    });
    const passwordResult = await apiRevealCredential.exec({
      id: context.params.id,
    });

    if (credentialResult.isLeft() || passwordResult.isLeft()) {
      return {
        props: {
          password: null,
          credential: null,
        },
      };
    }

    return Promise.resolve({
      props: {
        credential: PlainObject.serializer(credentialResult.value),
        password: PlainObject.serializer(passwordResult.value),
      },
    });
  },
);
