import React, { createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import { setCookie } from 'nookies'
import { makeApiAuthLogin, makeApiAuthMe } from '~/main/factories/usecases'
import { User } from '~/domain/models/user'

type SignInParams = {
  email: string
  password: string
}

type AuthContextData = {
  user: User
  isAuthenticated: boolean
  isRecovering: boolean
  signIn: (params: SignInParams) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)

const apiAuthLogin = makeApiAuthLogin()
const apiAuthMe = makeApiAuthMe()

export const AuthProvider: React.FC = props => {
  const [user, setUser] = useState<User>(null)
  const [isRecovering, setIsRecovering] = useState(true)

  useEffect(() => {
    apiAuthMe.exec().then(user => {
      if (user.isRight()) {
        setUser(user.value)
        setIsRecovering(false)
      }
    })
  }, [])

  const signIn = async (params: SignInParams) => {
    const auth = await apiAuthLogin.exec({
      email: params.email,
      password: params.password
    })

    if (auth.isLeft()) {
      setUser(null)
      return
    }

    setCookie(undefined, 'password:token', auth.value.token, {
      maxAge: 60 * 60 * 1, // 1 hour
      path: '/'
    })

    setUser(auth.value.user)

    Router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isRecovering, signIn }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
