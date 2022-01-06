import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { classNames } from '~/presentation/helpers'

type Props = {
  label?: string
  placeholder?: string
  type: string
  name?: string
  formRegister?: UseFormRegisterReturn
  readOnly?: true
}

export const InputForm: React.FC<Props> = props => {
  const inputClasses = classNames(
    props.readOnly
      ? 'bg-gray-50 focus:border-gray-100 focus:ring-gray-100'
      : 'focus:border-blue-400 focus:ring-blue-400',
    'focus:ring-1  focus:outline-none w-full font-light text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-4'
  )

  return (
    <div className="text-gray-800">
      {props.label && (
        <label htmlFor={props.name} className="block font-medium text-sm mb-1">
          {props.label}
        </label>
      )}

      <input
        {...props.formRegister}
        className={inputClasses}
        placeholder={props.placeholder}
        type={props.type}
        id={props.name}
        readOnly={props.readOnly}
      />
    </div>
  )
}
