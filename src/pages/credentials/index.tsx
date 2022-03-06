import { Paginator } from '~/domain/models/paginator'
import {
  makeApiDeleteCredential,
  makeApiLoadCredentials,
  makeApiLoadFolders,
  makeApiLoadTags
} from '~/main/factories/usecases'
import {
  CredentialPaginator,
  QueryStringParser,
  ssrAuth
} from '~/presentation/helpers'
import {
  IndexTemplate,
  IndexTemplateProps
} from '~/presentation/templates/credentials'
import { useRouter } from 'next/router'
import { Tag } from '~/domain/models/tag'
import { PlainObject, ReadonlyRequired } from '~/domain/fields/plain-object'
import { Folder } from '~/domain/models/folder'
import { Credential } from '~/domain/models/credential'
import { useMemo } from 'react'

// const cryptographyColorByColors: Record<any, any> = {
//   AES128: 'green',
//   'AES128-CBC': 'purple',
//   AES192: 'blue',
//   AES256: 'pink'
// }

type Props = Omit<
  IndexTemplateProps,
  | 'onDeleteCredential'
  | 'onSearch'
  | 'onChangeTags'
  | 'credentials'
  | 'folders'
  | 'tags'
> & {
  credentials: ReadonlyRequired<Paginator<Credential>>
  folders: ReadonlyRequired<Folder[]>
  tags: ReadonlyRequired<Tag[]>
}

const apiDeleteCredential = makeApiDeleteCredential()

export default function Page(props: Props) {
  const router = useRouter()

  const deserialized = useMemo(() => {
    return {
      tags: PlainObject.deserializer(Tag.create, props.tags),
      folders: PlainObject.deserializer(Folder.create, props.folders),
      credentials: PlainObject.deserializer(
        CredentialPaginator.create,
        props.credentials
      )
    }
  }, [props.credentials, props.tags, props.folders])

  const handleSearch: IndexTemplateProps['onSearch'] = async term => {
    await router.push({ query: { search: term } })
  }

  const handleDeleteCredential: IndexTemplateProps['onDeleteCredential'] = async id => {
    await apiDeleteCredential.exec({ id })
    await router.replace({ query: router.query })
  }

  const handleChangeTags: IndexTemplateProps['onChangeTags'] = async value => {
    await router.replace({ query: { ...router.query, tags: value } })
  }

  return (
    <IndexTemplate
      {...props}
      tags={deserialized.tags}
      folders={deserialized.folders}
      credentials={deserialized.credentials}
      onChangeTags={handleChangeTags}
      onDeleteCredential={handleDeleteCredential}
      onSearch={handleSearch}
    />
  )
}

type QueryString = {
  search: string
  page: string
  tags: string | string[]
}

export const getServerSideProps = ssrAuth<Props>(async context => {
  const apiLoadCredentials = makeApiLoadCredentials(context.req.cookies)
  const apiLoadFolders = makeApiLoadFolders(context.req.cookies)
  const apiLoadTags = makeApiLoadTags(context.req.cookies)
  const query = context.query as QueryString
  const tagsQuery = QueryStringParser.array<string[]>(query.tags, [])

  const [credentialsResult, foldersResult, tagsResult] = await Promise.all([
    apiLoadCredentials.exec({
      page: Number(query.page),
      search: query.search,
      tags: tagsQuery
    }),
    apiLoadFolders.exec(),
    apiLoadTags.exec({ limit: 1000 })
  ])

  const credentials = credentialsResult.isRight()
    ? credentialsResult.value
    : null
  const folders = foldersResult.isRight() ? foldersResult.value : []
  const tags = tagsResult.isRight()
    ? tagsResult.value
    : Paginator.create<Tag>({ data: [], pagination: null })

  return {
    props: {
      credentials: PlainObject.serializer(credentials),
      folders: PlainObject.serializer(folders),
      tags: PlainObject.serializer(tags.data),
      initializeValues: {
        selectedTags: tagsQuery,
        searchTerm: query.search ?? null
      }
    }
  }
})
