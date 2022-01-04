import React from 'react'

export const DataCell: React.FC = props => {
  return <td className="px-6 py-4 whitespace-nowrap">{props.children}</td>
}
