import { ArrowLeftIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { PasswordTypes } from '~/domain/models/password'
import { CredentialTypes } from '~/domain/models/credential'
import {
  makeApiRetrieveCredential,
  makeApiRevealCredential
} from '~/main/factories/usecases'
import { Scaffold } from '~/presentation/components/Scaffold'
import { ssrAuth } from '~/presentation/helpers'
import { DatePipeOperator } from '~/presentation/pipes'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { Fragment } from 'react'

type Props = {
  password: PasswordTypes.DTO
  credential: CredentialTypes.DTO
}

const Reveal: React.FC<Props> = props => {
  const { exec: formatDate } = DatePipeOperator.factory()

  const scaffoldAppend = () => {
    return (
      <Fragment>
        <span className="sm:ml-3">
          <Link href={{ pathname: '/credentials' }} passHref>
            <DefaultButton
              tag="a"
              color="gray"
              className="inline-flex border border-transparent py-1.5 px-3"
            >
              <ArrowLeftIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-600"
                aria-hidden="true"
              />
              Voltar
            </DefaultButton>
          </Link>
        </span>
      </Fragment>
    )
  }

  return (
    <Scaffold title="Credencial" append={scaffoldAppend}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {props.credential.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 whitespace-pre-line">
            {props.credential.description}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Conta</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {props.credential.username}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Senha</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {props.password.decrypted}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Criação</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDate({
                  value: props.credential.createdAt,
                  pattern: "dd/MMM 'de' yyyy 'às' HH:mm"
                })}
              </dd>
            </div>
            {props.credential.folders.length > 0 && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Pastas</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul
                    role="list"
                    className="border border-gray-200 rounded-md divide-y divide-gray-200"
                  >
                    {props.credential.folders.map(folder => {
                      return (
                        <li
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                          key={folder.id}
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 truncate">
                              {folder.name}
                            </span>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </dd>
              </div>
            )}
            {props.credential.tags.length > 0 && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tags</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-x-2">
                  {props.credential.tags.map(tag => {
                    return (
                      <div
                        className="py-0.5 px-3 rounded text-white inline-block"
                        style={{ backgroundColor: tag.color }}
                        key={tag.id}
                      >
                        {tag.label}
                      </div>
                    )
                  })}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </Scaffold>
  )
}

export default Reveal

export const getServerSideProps = ssrAuth<Props, { id: string }>(
  async context => {
    const apiRetrieveCredential = makeApiRetrieveCredential(context.req.cookies)
    const apiRevealCredential = makeApiRevealCredential(context.req.cookies)

    const credentialResult = await apiRetrieveCredential.exec({
      id: context.params.id
    })
    const passwordResult = await apiRevealCredential.exec({
      id: context.params.id
    })

    if (credentialResult.isLeft() || passwordResult.isLeft()) {
      return {
        props: {
          password: null,
          credential: null
        }
      }
    }

    return Promise.resolve({
      props: {
        credential: credentialResult.value.serialize(),
        password: passwordResult.value.serialize()
      }
    })
  }
)
