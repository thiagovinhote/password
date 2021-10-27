import { ElementType } from "react";
import { useAuth } from '../hooks'

export const withAuth = (Component: ElementType) => {
  const Wrapper = (props: any) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
      return null
    }

    return <Component {...props} />
  }

  return Wrapper;
}
