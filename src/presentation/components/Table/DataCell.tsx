import React from 'react'

type Props = {
  className?: string
}

export const DataCell: React.FC<Props> = props => {
  return (
    <td className={['px-6 py-4 whitespace-nowrap', props.className].join(' ')}>
      {props.children}
    </td>
  )
}
