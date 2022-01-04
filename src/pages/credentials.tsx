import { PlusIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { Fragment, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Credential } from '~/domain/models/credential'
import { Folder } from '~/domain/models/folder'
import { CreateFolder } from '~/domain/usecases/create-folder'
import { Usecase } from '~/domain/usecases/usecase'
import { makeApiCreateFolder, makeApiLoadCredentials, makeApiLoadFolders } from '~/main/factories/usecases'
import { Badge } from '~/presentation/components/Badge'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { Dropdown } from '~/presentation/components/Dropdown'
import { InputForm } from '~/presentation/components/InputForm'
import { Scaffold } from '~/presentation/components/Scaffold'
import { Select } from '~/presentation/components/Select'
import { SlideOver } from '~/presentation/components/SlideOver'
import { DataCell, HeaderCell } from '~/presentation/components/Table'
import { range, ssrAuth } from '~/presentation/helpers'
import { CreateFolderForm, CreateFolderFormRef } from '~/presentation/pages/credentials'
import { DatePipeOperator } from '~/presentation/pipes'

const cryptographyColorByColors: Record<any, any> = {
  'AES128': 'green',
  'AES128-CBC': 'purple',
  'AES192': 'blue',
  'AES256': 'pink'
}

type Props = {
  // createFolder: Usecase<CreateFolder.Params, CreateFolder.Result>
  credentials: Credential[]
  folders: Folder[]
}

const Credentials: React.FC<Props> = (props) => {
  const { exec: formatDate } = DatePipeOperator.factory()
  const [folder, setFolder] = useState(props.folders[0])
  const createFolderRef = useRef<CreateFolderFormRef>()

  const scaffoldAppend = () => {
    return (
      <Fragment>
        <Select value={folder} data={props.folders} labelProp="name" valueProp="id" onChange={setFolder} />
        <span className="sm:ml-3">
          <DefaultButton color="gray" className="inline-flex border border-transparent py-1.5 px-3" onClick={() => createFolderRef.current?.open()}>
            <PlusIcon className="-ml-1 mr-2 h-5 w-5 text-gray-600" aria-hidden="true" />
            Nova Pasta
          </DefaultButton>
        </span>
        <span className="sm:ml-3">
          <Link href="/add" as={{ query: { folder_id: folder?.id } }} passHref>
            <DefaultButton color="blue" className="inline-flex border border-transparent py-1.5 px-3" tag="a">
              <PlusIcon className="-ml-1 mr-2 h-5 w-5 text-blue-600" aria-hidden="true" />
              Nova Credencial
            </DefaultButton>
          </Link>
        </span>
      </Fragment>
    )
  }

  return (
    <Scaffold title="Passwords" append={scaffoldAppend}>
      <CreateFolderForm ref={createFolderRef} />

      <div className="overflow-hidden border-2 border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <HeaderCell>
                Nome
              </HeaderCell>
              <HeaderCell>
                Conta
              </HeaderCell>
              <HeaderCell>
                Descrição
              </HeaderCell>
              <HeaderCell>
                Criação
              </HeaderCell>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {props.credentials.map((credential) => (
              <tr key={credential.id}>
                <DataCell>
                  <span className="text-sm text-gray-900">{credential.name}</span>
                </DataCell>
                <DataCell>
                  <h4 className="text-sm font-medium text-gray-900">{credential.username}</h4>
                </DataCell>
                <DataCell>
                  <h4 className="text-sm font-medium text-gray-900">{credential.description}</h4>
                </DataCell>
                <DataCell>
                  <span className="text-sm text-gray-500">
                    {formatDate({ value: credential.createdAt, pattern: "dd/MMM 'de' yyyy 'às' HH:mm" })}
                  </span>
                </DataCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Scaffold>
  )
}

export default Credentials;

export const getServerSideProps = ssrAuth<Props>(async (context) => {
  const apiLoadCredentials = makeApiLoadCredentials(context.req.cookies);
  const apiLoadFolders = makeApiLoadFolders(context.req.cookies);
  const apiCreateFolder = makeApiCreateFolder();

  const credentialsResult = await apiLoadCredentials.exec();
  const foldersResult = await apiLoadFolders.exec();

  const credentials = credentialsResult.isRight() ? credentialsResult.value : []
  const folders = foldersResult.isRight() ? foldersResult.value : []

  return {
    props: {
      // createFolder: apiCreateFolder,
      credentials: Credential.serializeArray(credentials),
      folders: Folder.serializeArray(folders)
    }
  }
})
