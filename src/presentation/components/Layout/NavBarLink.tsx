import React, { ReactNode, ReactElement } from 'react'
import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'

type Props = LinkProps

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const NavBarLink: React.FC<Props> = (props) => {
  const router = useRouter()

  const activeClasses = 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
  const normalClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'

  const classes = []

  if (router.pathname === props.href) {
    classes.push(activeClasses)
  } else {
    classes.push(normalClasses)
  }

  return (
    <Link {...props}>
      <a className={classNames(classes)}>
        {props.children}
      </a>
    </Link>
  )
}
