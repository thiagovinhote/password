import {
  EyeIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  FilterIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { Credential } from '~/domain/models/credential'
import { Folder } from '~/domain/models/folder'
import { Paginator } from '~/domain/models/paginator'
import {
  makeApiDeleteCredential,
  makeApiLoadCredentials,
  makeApiLoadFolders,
  makeApiLoadTags
} from '~/main/factories/usecases'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { Pagination } from '~/presentation/components/Pagination'
import { Scaffold } from '~/presentation/components/Scaffold'
import { InputForm } from '~/presentation/components/InputForm'
import { DataCell, HeaderCell } from '~/presentation/components/Table'
import { QueryStringParser, ssrAuth } from '~/presentation/helpers'
import {
  FilterForm,
  OnChangeFilter
} from '~/presentation/organisms/credentials'
import { DatePipeOperator } from '~/presentation/pipes'
import { useRouter } from 'next/router'
import { TagTypes } from '~/domain/models/tag'

// const cryptographyColorByColors: Record<any, any> = {
//   AES128: 'green',
//   'AES128-CBC': 'purple',
//   AES192: 'blue',
//   AES256: 'pink'
// }

type Props = {
  credentials: Paginator<Credential>
  folders: Folder[]
  tags: TagTypes.DTO[]
  selected: string[]
}

type SearchDataForm = {
  value?: string
}

const apiDeleteCredential = makeApiDeleteCredential()

const Credentials: React.FC<Props> = props => {
  const { exec: formatDate } = DatePipeOperator.factory()
  const router = useRouter()
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const searchForm = useForm<SearchDataForm>({
    defaultValues: { value: router.query.search as string }
  })

  const scaffoldAppend = () => {
    return (
      <div className="space-x-4">
        <DefaultButton
          color="indigo"
          className="inline-flex border border-transparent py-1.5 px-3"
          onClick={() => setFilterIsOpen(true)}
        >
          <FilterIcon
            className="-ml-1 mr-2 h-5 w-5 text-indigo-600"
            aria-hidden="true"
          />
          Filtros
        </DefaultButton>
        <Link href="/add" passHref>
          <DefaultButton
            color="blue"
            className="inline-flex border border-transparent py-1.5 px-3"
            tag="a"
          >
            <PlusIcon
              className="-ml-1 mr-2 h-5 w-5 text-blue-600"
              aria-hidden="true"
            />
            Nova Credencial
          </DefaultButton>
        </Link>
      </div>
    )
  }

  const handleSearch: SubmitHandler<SearchDataForm> = async data => {
    await router.push({ query: { search: data.value } })
  }

  const deleteCredential = async (id: string) => {
    await apiDeleteCredential.exec({ id })
    await router.replace({ query: router.query })
  }

  const handleChangeFilters: OnChangeFilter = async value => {
    await router.replace({ query: { ...router.query, tags: value.tags } })
  }

  return (
    <Scaffold title="Credenciais" append={scaffoldAppend}>
      <FilterForm
        open={filterIsOpen}
        onClose={setFilterIsOpen}
        tags={props.tags}
        selected={props.selected}
        onChange={handleChangeFilters}
      />

      <div className="overflow-hidden sm:border-2 border-gray-200 rounded-lg">
        <form
          className="bg-white px-0 pb-3 sm:py-3 flex items-center justify-between sm:border-b border-gray-200 sm:px-6"
          onSubmit={searchForm.handleSubmit(handleSearch)}
        >
          <InputForm
            type="text"
            className="w-full"
            placeholder="Buscar pelo nome, username ou descrição"
            formRegister={searchForm.register('value')}
          />
          <DefaultButton
            color="purple"
            className="inline-flex border border-transparent px-3 ml-3"
            attrs={{ type: 'submit' }}
          >
            <SearchIcon
              className="h-5 w-5 text-purple-600"
              aria-hidden="true"
            />
          </DefaultButton>
        </form>

        <table className="hidden md:inline-table min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <HeaderCell>Nome</HeaderCell>
              <HeaderCell>Descrição</HeaderCell>
              <HeaderCell>Criação</HeaderCell>
              <HeaderCell>Ações</HeaderCell>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {props.credentials.data.map(credential => (
              <tr key={credential.id}>
                <DataCell>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {credential.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {credential.username}
                      </div>
                    </div>
                  </div>
                </DataCell>
                <DataCell className="whitespace-pre-line">
                  <h4 className="text-sm font-medium text-gray-900">
                    {credential.description}
                  </h4>
                </DataCell>
                <DataCell>
                  <span className="text-sm text-gray-500">
                    {formatDate({
                      value: credential.createdAt,
                      pattern: "dd/MMM 'de' yyyy 'às' HH:mm"
                    })}
                  </span>
                </DataCell>
                <DataCell className="space-x-2">
                  <Link
                    href={{
                      pathname: '/credentials/[id]/reveal',
                      query: { id: credential.id }
                    }}
                    passHref
                  >
                    <DefaultButton
                      color="yellow"
                      className="inline-flex border border-transparent py-0.5 px-3"
                      tag="a"
                    >
                      <EyeIcon
                        className="h-5 w-5 text-yellow-600"
                        aria-hidden="true"
                      />
                    </DefaultButton>
                  </Link>
                  <Link
                    href={{
                      pathname: '/credentials/[id]',
                      query: { id: credential.id }
                    }}
                    passHref
                  >
                    <DefaultButton
                      color="blue"
                      className="inline-flex border border-transparent py-0.5 px-3"
                      tag="a"
                    >
                      <PencilIcon
                        className="h-5 w-5 text-blue-600"
                        aria-hidden="true"
                      />
                    </DefaultButton>
                  </Link>
                  <DefaultButton
                    color="red"
                    className="inline-flex border border-transparent py-0.5 px-3"
                    onClick={() => deleteCredential(credential.id)}
                  >
                    <TrashIcon
                      className="h-5 w-5 text-red-600"
                      aria-hidden="true"
                    />
                  </DefaultButton>
                </DataCell>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="sm:hidden min-w-full divide-y space-y-4 divide-gray-200">
          {props.credentials.data.map(credential => (
            <div
              key={credential.id}
              className="p-6 bg-white overflow-hidden rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {credential.name}
              </h5>
              <p className="mb-3 font-normal text-ellipsis hover:text-clip text-gray-700 dark:text-gray-400">
                {credential.description}
              </p>

              <div className="flex space-x-3">
                <Link
                  href={{
                    pathname: '/credentials/[id]/reveal',
                    query: { id: credential.id }
                  }}
                  passHref
                >
                  <DefaultButton
                    color="yellow"
                    className="inline-flex border border-transparent py-0.5 px-3"
                    tag="a"
                  >
                    <EyeIcon
                      className="h-5 w-5 text-yellow-600"
                      aria-hidden="true"
                    />
                  </DefaultButton>
                </Link>
                <Link
                  href={{
                    pathname: '/credentials/[id]',
                    query: { id: credential.id }
                  }}
                  passHref
                >
                  <DefaultButton
                    color="blue"
                    className="inline-flex border border-transparent py-0.5 px-3"
                    tag="a"
                  >
                    <PencilIcon
                      className="h-5 w-5 text-blue-600"
                      aria-hidden="true"
                    />
                  </DefaultButton>
                </Link>
                <DefaultButton
                  color="red"
                  className="inline-flex border border-transparent py-0.5 px-3"
                  onClick={() => deleteCredential(credential.id)}
                >
                  <TrashIcon
                    className="h-5 w-5 text-red-600"
                    aria-hidden="true"
                  />
                </DefaultButton>
              </div>
            </div>
          ))}
        </div>

        <Pagination value={props.credentials.pagination} />
      </div>
    </Scaffold>
  )
}

export default Credentials

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
  const tagsQuery = QueryStringParser.array(query.tags)

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
      selected: tagsQuery
    }
  }
})
