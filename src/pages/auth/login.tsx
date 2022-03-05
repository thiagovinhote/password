import { useState } from 'react'
import Link from 'next/link'
import { ReactComponent as LogoSvg } from '../../assets/images/padlock.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '~/presentation/hooks'
import { DefaultButton } from '~/presentation/molecules/DefaultButton'
import { InputForm } from '~/presentation/molecules/InputForm'
import { GetServerSideProps } from 'next'

type UserFormData = {
  email: string
  password: string
}

type Props = {
  email?: string
}

const Login: React.FC<Props> = props => {
  const signForm = useForm<UserFormData>({
    defaultValues: { email: props.email }
  })
  const [signError, setSignError] = useState<string>()
  const { signIn } = useAuth()

  const handleSignIn: SubmitHandler<UserFormData> = async data => {
    setSignError(undefined)
    const error = await signIn({ email: data.email, password: data.password })
    setSignError(error?.message)
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <LogoSvg className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entrar com sua conta
          </h2>
        </div>

        {signError && (
          <div
            className="p-4 mb-4  bg-red-100 rounded-lg dark:bg-red-200"
            role="alert"
          >
            <span className="text-sm text-red-700 dark:text-red-800">
              {signError}
            </span>
          </div>
        )}

        <form
          className="mt-8 space-y-6"
          onSubmit={signForm.handleSubmit(handleSignIn)}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md space-y-4">
            <InputForm
              formRegister={signForm.register('email')}
              label="Seu e-mail"
              type="email"
              autoComplete="email"
              required
              placeholder="Endereço de e-mail"
            />
            <InputForm
              formRegister={signForm.register('password')}
              label="Senha"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Senha utilizada no cadastro"
            />
          </div>

          <div className="space-y-4">
            <div className="mt-6">
              <DefaultButton
                color="indigo"
                className="w-full font-medium"
                tag="button"
                attrs={{ type: 'submit' }}
              >
                Entrar
              </DefaultButton>
            </div>
            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
              <Link href="/auth/register" passHref>
                <a className="text-indigo-600 font-medium hover:text-indigo-500">
                  Criar conta
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps<Props> = context => {
  const email = context.query.email as string

  return Promise.resolve({
    props: {
      email: email ?? null
    }
  })
}
