import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CredentialTypes } from '~/domain/models/credential'
import {
  makeApiRetrieveCredential,
  makeApiUpdateCredential
} from '~/main/factories/usecases'
import { Scaffold } from '~/presentation/components/Scaffold'
import { ssrAuth } from '~/presentation/helpers'
import { DatePipeOperator } from '~/presentation/pipes'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { Fragment } from 'react'
import { InputForm } from '~/presentation/components/InputForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextAreaForm } from '~/presentation/components/TextAreaForm'

type Props = {
  credential: CredentialTypes.DTO
}

type AccountFormData = {
  username: string
  password: string
}

type DetailsFormData = {
  name: string
  description?: string
}

const apiUpdateCredential = makeApiUpdateCredential()

const Credential: React.FC<Props> = props => {
  const router = useRouter()
  const { exec: formatDate } = DatePipeOperator.factory()
  const accountForm = useForm<AccountFormData>({
    defaultValues: {
      username: props.credential.username,
      password: props.credential.username
    }
  })
  const detailsForm = useForm<DetailsFormData>({
    defaultValues: {
      name: props.credential.name,
      description: props.credential.description
    }
  })

  const handleSaveAccount: SubmitHandler<AccountFormData> = async data => {
    const result = await apiUpdateCredential.exec({
      id: props.credential.id,
      payload: data
    })

    if (result.isRight()) {
      await router.replace(router.asPath)
      alert('Dados salvos com sucesso!')
    }
  }

  const handleSaveDetails: SubmitHandler<DetailsFormData> = async data => {
    const result = await apiUpdateCredential.exec({
      id: props.credential.id,
      payload: data
    })

    if (result.isRight()) {
      await router.replace(router.asPath)
      alert('Dados salvos com sucesso!')
    }
  }

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
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Detalhes
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 whitespace-pre-line">
              {formatDate({
                value: props.credential.createdAt,
                pattern: "dd/MMM 'de' yyyy 'às' HH:mm"
              })}
            </p>
          </div>
          <form
            onSubmit={detailsForm.handleSubmit(handleSaveDetails)}
            className="border-t border-gray-200 space-y-4 p-6"
          >
            <InputForm
              label="Nome"
              placeholder="Dê uma nome para as suas credenciais"
              type="text"
              formRegister={detailsForm.register('name')}
            />
            <TextAreaForm
              label="Descrição"
              placeholder="Informações extras sobre a credencial"
              formRegister={detailsForm.register('description')}
              rows={2}
            />

            <DefaultButton
              className="w-2/6"
              color="green"
              attrs={{ type: 'submit' }}
            >
              Salvar
            </DefaultButton>
          </form>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {props.credential.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 whitespace-pre-line">
              {props.credential.description}
            </p>
          </div>
          <form
            onSubmit={accountForm.handleSubmit(handleSaveAccount)}
            className="border-t border-gray-200 space-y-4 p-6"
          >
            <InputForm
              label="Email / Username"
              placeholder="Informe sua conta"
              type="text"
              formRegister={accountForm.register('username')}
            />
            <InputForm
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              formRegister={accountForm.register('password')}
              readOnly
            />
            <DefaultButton
              className="w-2/6"
              color="green"
              attrs={{ type: 'submit' }}
            >
              Salvar
            </DefaultButton>
          </form>
        </div>
      </div>
    </Scaffold>
  )
}

export default Credential

export const getServerSideProps = ssrAuth<Props, { id: string }>(
  async context => {
    const apiRetrieveCredential = makeApiRetrieveCredential(context.req.cookies)

    const credentialResult = await apiRetrieveCredential.exec({
      id: context.params.id
    })

    if (credentialResult.isLeft()) {
      return {
        props: {
          credential: null
        }
      }
    }

    return Promise.resolve({
      props: {
        credential: credentialResult.value.serialize()
      }
    })
  }
)
