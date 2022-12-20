import React from 'react'
import { DatePipeOperator } from '~/presentation/pipes'
import packageJSON from '~/../package.json'

export const Footer: React.FC = () => {
  const { exec: formatDate } = DatePipeOperator.factory()

  return (
    <div className="mt-auto p-4 bg-gray-800 text-center">
      <span className="text-sm text-gray-300">
        {formatDate({
          value: new Date(),
          pattern: "dd/MM 'de' yyyy"
        })}
      </span>
      <span className="text-sm text-gray-300">&nbsp;-&nbsp;</span>
      <span className="text-sm text-gray-300 font-semibold">
        {packageJSON.version}
      </span>
    </div>
  )
}
