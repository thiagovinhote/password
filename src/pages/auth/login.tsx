import { ReactComponent as LogoSvg } from '../../assets/images/padlock.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '~/presentation/hooks'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { InputForm } from '~/presentation/components/InputForm'

type UserFormData = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<UserFormData>()
  const { signIn } = useAuth()

  const handleSignIn: SubmitHandler<UserFormData> = async data => {
    await signIn({ email: data.email, password: data.password })
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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <InputForm
              formRegister={register('email')}
              label="Seu e-mail"
              type="email"
              autoComplete="email"
              required
              placeholder="Endereço de e-mail"
            />
            <InputForm
              formRegister={register('password')}
              label="Senha"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Senha utilizada no cadastro"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <DefaultButton
              color="indigo"
              className="w-full font-medium"
              tag="button"
              attrs={{ type: 'submit' }}
            >
              Login
            </DefaultButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
