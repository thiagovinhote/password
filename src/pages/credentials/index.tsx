import { EyeIcon, PencilIcon, PlusIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { Fragment, useRef, useState } from 'react'
import { Credential } from '~/domain/models/credential'
import { Folder } from '~/domain/models/folder'
import { Paginator } from '~/domain/models/paginator'
import {
  makeApiCreateFolder,
  makeApiLoadCredentials,
  makeApiLoadFolders
} from '~/main/factories/usecases'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { Pagination } from '~/presentation/components/Pagination'
import { Scaffold } from '~/presentation/components/Scaffold'
import { Select } from '~/presentation/components/Select'
import { DataCell, HeaderCell } from '~/presentation/components/Table'
import { ssrAuth } from '~/presentation/helpers'
import {
  CreateFolderForm,
  CreateFolderFormRef
} from '~/presentation/pages/credentials'
import { DatePipeOperator } from '~/presentation/pipes'

// const cryptographyColorByColors: Record<any, any> = {
//   AES128: 'green',
//   'AES128-CBC': 'purple',
//   AES192: 'blue',
//   AES256: 'pink'
// }

type Props = {
  credentials: Paginator<Credential>
  folders: Folder[]
}

const apiCreateFolder = makeApiCreateFolder()

const Credentials: React.FC<Props> = props => {
  const { exec: formatDate } = DatePipeOperator.factory()
  const [folder, setFolder] = useState(props.folders[0])
  const createFolderRef = useRef<CreateFolderFormRef>()

  const scaffoldAppend = () => {
    return (
      <Fragment>
        <Select
          value={folder}
          data={props.folders}
          labelProp="name"
          valueProp="id"
          onChange={setFolder}
        />
        <DefaultButton
          color="gray"
          className="inline-flex border border-transparent py-1.5 px-3 ml-3"
          onClick={() => createFolderRef.current?.open()}
        >
          <PlusIcon
            className="-ml-1 mr-2 h-5 w-5 text-gray-600"
            aria-hidden="true"
          />
          Nova Pasta
        </DefaultButton>
        <Link href="/add" as={{ query: { folder_id: folder?.id } }} passHref>
          <DefaultButton
            color="blue"
            className="inline-flex border border-transparent py-1.5 px-3 ml-3"
            tag="a"
          >
            <PlusIcon
              className="-ml-1 mr-2 h-5 w-5 text-blue-600"
              aria-hidden="true"
            />
            Nova Credencial
          </DefaultButton>
        </Link>
      </Fragment>
    )
  }

  return (
    <Scaffold title="Passwords" append={scaffoldAppend}>
      <CreateFolderForm ref={createFolderRef} createFolder={apiCreateFolder} />

      <div className="overflow-hidden border-2 border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
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
                <DataCell>
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
                      className="inline-flex border border-transparent py-0.5 px-3 ml-3"
                      tag="a"
                    >
                      <PencilIcon
                        className="h-5 w-5 text-blue-600"
                        aria-hidden="true"
                      />
                    </DefaultButton>
                  </Link>
                </DataCell>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination value={props.credentials.pagination} />
      </div>
    </Scaffold>
  )
}

export default Credentials

export const getServerSideProps = ssrAuth<Props>(async context => {
  const apiLoadCredentials = makeApiLoadCredentials(context.req.cookies)
  const apiLoadFolders = makeApiLoadFolders(context.req.cookies)

  const credentialsResult = await apiLoadCredentials.exec({
    page: Number(context.query.page)
  })
  const foldersResult = await apiLoadFolders.exec()

  const credentials = credentialsResult.isRight()
    ? credentialsResult.value
    : null
  const folders = foldersResult.isRight() ? foldersResult.value : []

  return {
    props: {
      credentials: credentials?.serialize(),
      folders: Folder.serializeArray(folders)
    }
  }
})
