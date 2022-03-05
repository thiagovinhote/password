import React from 'react'
import { DefaultButton } from '~/presentation/components/DefaultButton'

type Props = {
  value: boolean
  onClick: () => void
}

export const TagItemSelect: React.FC<Props> = props => {
  const color = props.value ? 'blue' : 'gray'

  return (
    <DefaultButton
      className="px-3 py-1 rounded-lg"
      color={color}
      onClick={props.onClick}
      attrs={{ type: 'button' }}
    >
      <div className="flex">{props.children}</div>
    </DefaultButton>
  )
}
