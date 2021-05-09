import React, { Fragment, ReactNode } from 'react'

export type Props = {
  label: string
  children: ReactNode
}

export const OptionItem: React.FC<Props> = (props) => {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  )
}
