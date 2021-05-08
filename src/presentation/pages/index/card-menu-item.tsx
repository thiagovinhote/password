import React from "react";
import Link, { LinkProps } from 'next/link'

import { ReactComponent as PadlockImage} from '../../../assets/images/padlock.svg'
import { DefaultButton } from "~/presentation/components/DefaultButton";

export type Props = {
  title: string
  description: string
  linkText: string
  linkTo: LinkProps
}

export const CardMenuItem: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col bg-white rounded-xl py-6 border-2 hover:border-blue-200">
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
          <DefaultButton className="w-3/5" tag="a" color="blue">{props.linkText}</DefaultButton>
        </Link>
      </div>
    </div>
  )
}
