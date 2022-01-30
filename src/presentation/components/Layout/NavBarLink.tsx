import React from 'react'
import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import { classNames } from '~/presentation/helpers'

type Props = LinkProps & { vertical?: true; onClick?: () => void }

const Classes = {
  horizontal: {
    activeClasses:
      'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium',
    normalClasses:
      'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
  },
  vertical: {
    activeClasses:
      'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium',
    normalClasses:
      'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
  }
}

export const NavBarLink: React.FC<Props> = props => {
  const router = useRouter()
  const direction = props.vertical === true ? 'vertical' : 'horizontal'

  const classes = []

  if (router.pathname === props.href) {
    classes.push(Classes[direction].activeClasses)
  } else {
    classes.push(Classes[direction].normalClasses)
  }

  return (
    <Link {...props}>
      <a className={classNames(...classes)} onClick={props.onClick}>
        {props.children}
      </a>
    </Link>
  )
}
