import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import { PlainObject, ReadonlyRequired } from "~/domain/fields/plain-object";
import { Credential } from "~/domain/models/credential";
import { Paginator } from "~/domain/models/paginator";
import { Tag } from "~/domain/models/tag";
import {
  makeApiCreateCredentialTag,
  makeApiCreateTag,
  makeApiDeleteCredentialTag,
  makeApiLoadTags,
  makeApiRetrieveCredential,
  makeApiUpdateCredential,
} from "~/main/factories/usecases";
import { ssrAuth, TagPaginator } from "~/presentation/helpers";
import {
  ShowTemplate,
  ShowTemplateProps,
} from "~/presentation/templates/credentials/[id]";

type Props = Omit<
  ShowTemplateProps,
  | "credential"
  | "tags"
  | "onUpdateCredential"
  | "onLoadTags"
  | "onCreateTag"
  | "onAssociateTag"
  | "onDisassociateTag"
> & {
  credential: ReadonlyRequired<Credential>;
  tags: ReadonlyRequired<Paginator<Tag>>;
};

const apiUpdateCredential = makeApiUpdateCredential();
const apiCreateCredentialTag = makeApiCreateCredentialTag();
const apiDeleteCredentialTag = makeApiDeleteCredentialTag();
const apiCreateTag = makeApiCreateTag();
const apiLoadTags = makeApiLoadTags();

export default function Page(props: Props) {
  const router = useRouter();
  const deserialized = useMemo(() => {
    return {
      credential: PlainObject.deserializer(Credential.create, props.credential),
      tags: PlainObject.deserializer(TagPaginator.create, props.tags),
    };
  }, [props.credential, props.tags]);
  const [tags, setTags] = useState(deserialized.tags);

  const handleUpdateCredential: ShowTemplateProps["onUpdateCredential"] =
    async (id, data) => {
      const result = await apiUpdateCredential.exec({ id, payload: data });

      if (result.isRight()) {
        await router.replace(router.asPath);
      }

      return result.isRight();
    };

  const handleLoadTags: ShowTemplateProps["onLoadTags"] = async (term) => {
    const result = await apiLoadTags.exec({ search: term });
    if (result.isRight()) {
      setTags(result.value);
    }
  };

  const handleCreateTag: ShowTemplateProps["onCreateTag"] = async (data) => {
    const result = await apiCreateTag.exec({
      label: data.value,
      color: data.color,
    });

    if (result.isRight()) {
      return result.value;
    }
    return null;
  };

  const handleAssociateTag: ShowTemplateProps["onAssociateTag"] = async (
    credentialId: string,
    tagId: string,
  ) => {
    await apiCreateCredentialTag.exec({
      credentialId,
      tagId,
    });
  };

  const handleDisassociateTag: ShowTemplateProps["onDisassociateTag"] = async (
    credentialId: string,
    tagId: string,
  ) => {
    await apiDeleteCredentialTag.exec({
      credentialId,
      tagId,
    });
  };

  return (
    <ShowTemplate
      credential={deserialized.credential}
      tags={tags}
      onLoadTags={handleLoadTags}
      onCreateTag={handleCreateTag}
      onUpdateCredential={handleUpdateCredential}
      onAssociateTag={handleAssociateTag}
      onDisassociateTag={handleDisassociateTag}
    />
  );
}

export const getServerSideProps = ssrAuth<Props, { id: string }>(
  async (context) => {
    const apiRetrieveCredential = makeApiRetrieveCredential(
      context.req.cookies,
    );
    const apiLoadTags = makeApiLoadTags(context.req.cookies);

    const [credentialResult, tagsResult] = await Promise.all([
      apiRetrieveCredential.exec({
        id: context.params.id,
      }),
      apiLoadTags.exec({ limit: 100 }),
    ]);

    const credential = credentialResult.isRight()
      ? credentialResult.value
      : null;
    const tags = tagsResult.isRight() ? tagsResult.value : null;

    return {
      props: {
        credential: PlainObject.serializer(credential),
        tags: PlainObject.serializer(tags),
      },
    };
  },
);
