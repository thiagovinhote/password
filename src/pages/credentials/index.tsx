import { Folder } from '~/domain/models/folder'
import { Paginator } from '~/domain/models/paginator'
import {
  makeApiDeleteCredential,
  makeApiLoadCredentials,
  makeApiLoadFolders,
  makeApiLoadTags
} from '~/main/factories/usecases'
import { QueryStringParser, ssrAuth } from '~/presentation/helpers'
import {
  IndexTemplate,
  IndexTemplateProps
} from '~/presentation/templates/credentials'
import { useRouter } from 'next/router'

// const cryptographyColorByColors: Record<any, any> = {
//   AES128: 'green',
//   'AES128-CBC': 'purple',
//   AES192: 'blue',
//   AES256: 'pink'
// }

type Props = Omit<
  IndexTemplateProps,
  'onDeleteCredential' | 'onSearch' | 'onChangeTags'
>

const apiDeleteCredential = makeApiDeleteCredential()

export default function Page(props: Props) {
  const router = useRouter()

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
    : Paginator.create({ data: [], pagination: null })

  return {
    props: {
      credentials: credentials?.serialize(),
      folders: Folder.serializeArray(folders),
      tags: tags.serialize().data,
      initializeValues: {
        selectedTags: tagsQuery,
        searchTerm: query.search ?? null
      }
    }
  }
})
