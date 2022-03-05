import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { classNames } from '~/presentation/helpers'

type Props = {
  label: string
  placeholder?: string
  name?: string
  resize?: true
  rows?: number
  formRegister?: UseFormRegisterReturn
}

export const TextAreaForm: React.FC<Props> = props => {
  return (
    <div className="text-gray-800">
      <label htmlFor={props.name} className="block font-medium text-sm mb-1">
        {props.label}
      </label>
      <textarea
        {...props.formRegister}
        className={classNames(
          'focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none w-full font-light text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-4',
          !props.resize && 'resize-none'
        )}
        placeholder={props.placeholder}
        rows={props.rows}
        id={props.name}
      />
    </div>
  )
}
