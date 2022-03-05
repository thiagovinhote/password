import { ArrowLeftIcon, EyeIcon, PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CredentialTypes } from '~/domain/models/credential'
import {
  makeApiCreateCredentialTag,
  makeApiCreateTag,
  makeApiDeleteCredentialTag,
  makeApiLoadTags,
  makeApiRetrieveCredential,
  makeApiUpdateCredential
} from '~/main/factories/usecases'
import { Scaffold } from '~/presentation/molecules/Scaffold'
import { ssrAuth } from '~/presentation/helpers'
import { DatePipeOperator } from '~/presentation/pipes'
import { DefaultButton } from '~/presentation/molecules/DefaultButton'
import { Fragment, useState } from 'react'
import { InputForm } from '~/presentation/molecules/InputForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextAreaForm } from '~/presentation/molecules/TextAreaForm'
import { DataCell, HeaderCell } from '~/presentation/molecules/Table'
import { Paginator } from '~/domain/models/paginator'
import { Tag } from '~/domain/models/tag'
import { Toggle } from '~/presentation/molecules/Toggle'
import { useSet } from '~/presentation/hooks'

type Props = {
  credential: CredentialTypes.DTO
  tags: Paginator<Tag>
}

type AccountFormData = {
  username: string
  password: string
}

type DetailsFormData = {
  name: string
  description?: string
}

type TagsFormData = {
  value: string
  color?: string
}

const apiUpdateCredential = makeApiUpdateCredential()
const apiCreateCredentialTag = makeApiCreateCredentialTag()
const apiDeleteCredentialTag = makeApiDeleteCredentialTag()
const apiCreateTag = makeApiCreateTag()
const apiLoadTags = makeApiLoadTags()

const Credential: React.FC<Props> = props => {
  const router = useRouter()
  const [tags, setTags] = useState(props.tags)
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
  const tagsForm = useForm<TagsFormData>()
  const selectedTags = useSet(props.credential.tags.map(tag => tag.id))

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

  const handleSearchTags: SubmitHandler<TagsFormData> = async data => {
    const result = await apiLoadTags.exec({
      search: data.value
    })
    if (result.isRight()) {
      setTags(result.value)
    }
  }

  const handleSaveTag: SubmitHandler<TagsFormData> = async data => {
    const result = await apiCreateTag.exec({
      label: data.value,
      color: data.color
    })

    if (result.isRight()) {
      tagsForm.reset({ color: '#000000' })
      await Promise.all([
        handleChangeToggle(result.value.id),
        handleSearchTags({ value: '' })
      ])
    }
  }

  const handleChangeToggle = async (tagId: string) => {
    if (!selectedTags.has(tagId)) {
      await apiCreateCredentialTag.exec({
        credentialId: props.credential.id,
        tagId
      })
      selectedTags.add(tagId)
    } else {
      await apiDeleteCredentialTag.exec({
        credentialId: props.credential.id,
        tagId
      })
      selectedTags.remove(tagId)
    }
  }

  const scaffoldAppend = () => {
    return (
      <Fragment>
        <div className="space-x-3">
          <Link
            href={{
              pathname: '/credentials/[id]/reveal',
              query: { id: props.credential.id }
            }}
            passHref
          >
            <DefaultButton
              color="yellow"
              className="inline-flex border border-transparent py-1.5 px-3"
              tag="a"
            >
              <EyeIcon className="h-5 w-5 text-yellow-600" aria-hidden="true" />
            </DefaultButton>
          </Link>
          <Link href={{ pathname: '/credentials' }} passHref>
            <DefaultButton
              tag="a"
              color="gray"
              className="inline-flex border border-transparent py-1.5 px-3"
            >
              <ArrowLeftIcon
                className="mr-2 h-5 w-5 text-gray-600"
                aria-hidden="true"
              />
              Voltar
            </DefaultButton>
          </Link>
        </div>
      </Fragment>
    )
  }

  return (
    <Scaffold title="Credencial" append={scaffoldAppend}>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="grid grid-rows-2 gap-6">
          <div className="bg-white shadow overflow-hidden rounded-lg">
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
              className="border-t border-gray-200 space-y-4 px-4 py-5 sm:px-6"
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
                rows={3}
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

          <div className="bg-white shadow overflow-hidden rounded-lg">
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
              className="border-t border-gray-200 space-y-4 px-4 py-5 sm:px-6"
            >
              <InputForm
                label="Email / Username"
                placeholder="Informe sua conta"
                type="text"
                formRegister={accountForm.register('username')}
              />
              <InputForm
                label="Senha"
                placeholder="Não pode ser atualizada"
                type="password"
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

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Tags
            </h3>
          </div>

          <form
            className="border-t border-gray-200 p-4 flex items-center justify-between space-x-3"
            onSubmit={tagsForm.handleSubmit(handleSearchTags)}
          >
            <InputForm
              placeholder="Buscar tags pelo nome"
              type="text"
              formRegister={tagsForm.register('value')}
              className="w-full"
            />
            <div>
              <input
                {...tagsForm.register('color')}
                type="color"
                className="focus:ring-1 focus:outline-none font-light text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md"
              />
            </div>
            <DefaultButton
              color="purple"
              className="inline-flex border border-transparent py-1.5 px-3"
              onClick={tagsForm.handleSubmit(handleSaveTag)}
              attrs={{ type: 'button' }}
            >
              <PlusIcon
                className="h-5 w-5 text-purple-600"
                aria-hidden="true"
              />
            </DefaultButton>
          </form>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <HeaderCell>Nome</HeaderCell>
                <HeaderCell>Cor</HeaderCell>
                <HeaderCell>Selecionada?</HeaderCell>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tags.data.map(tag => (
                <tr key={tag.id}>
                  <DataCell>
                    <span className="text-sm text-gray-900">{tag.label}</span>
                  </DataCell>
                  <DataCell>
                    <div
                      style={{ backgroundColor: tag.color }}
                      className="h-5 w-5 rounded"
                    />
                  </DataCell>
                  <DataCell className="align-items-end">
                    <Toggle
                      value={selectedTags.has(tag.id)}
                      onChange={() => handleChangeToggle(tag.id)}
                    />
                  </DataCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Scaffold>
  )
}

export default Credential

export const getServerSideProps = ssrAuth<Props, { id: string }>(
  async context => {
    const apiRetrieveCredential = makeApiRetrieveCredential(context.req.cookies)
    const apiLoadTags = makeApiLoadTags(context.req.cookies)

    const [credentialResult, tagsResult] = await Promise.all([
      apiRetrieveCredential.exec({
        id: context.params.id
      }),
      apiLoadTags.exec({ limit: 100 })
    ])

    const credential = credentialResult.isRight()
      ? credentialResult.value
      : null
    const tags = tagsResult.isRight() ? tagsResult.value : null

    return {
      props: {
        credential: credential?.serialize(),
        tags: tags?.serialize()
      }
    }
  }
)
