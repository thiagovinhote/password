import React from 'react'
import { DatePipeOperator } from '~/presentation/pipes'

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
    </div>
  )
}
