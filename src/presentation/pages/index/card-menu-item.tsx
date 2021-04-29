import React from "react";
import Link, { LinkProps } from 'next/link'

import PadlockImage from '../../../assets/images/padlock.svg'

export type Props = {
  title: string
  description: string
  linkText: string
  linkTo: LinkProps
}

export const CardMenuItem: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col bg-white rounded-xl py-6">
      <PadlockImage className="w-3/12 h-auto mx-auto" />
      <div className="px-8 py-6 text-center mb-auto">
        <p className="font-bold text-xl pb-2">
          {props.title}
        </p>
        <p className="text-gray-500">
          {props.description}
        </p>
      </div>

      <div className="flex justify-center text-center">
        <Link {...props.linkTo} passHref>
          <a className="w-3/5 focus:outline-none active:text-blue-900 active:bg-blue-300 hover:bg-blue-200 hover:text-blue-800 rounded bg-blue-100 text-blue-600 text-sm px-4 py-2">
            {props.linkText}
          </a>
        </Link>
      </div>
    </div>
  )
}
