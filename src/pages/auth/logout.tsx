import { Fragment } from 'react'

import { makeApiAuthLogout } from '~/main/factories/usecases'
import { ssrAuth } from '~/presentation/helpers'
import { destroyCookie } from 'nookies'

export default Fragment

export const getServerSideProps = ssrAuth(async context => {
  const apiAuthLogout = makeApiAuthLogout(context.req.cookies)

  await apiAuthLogout.exec()

  destroyCookie(context, 'password:token', { path: '/' })

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
})
