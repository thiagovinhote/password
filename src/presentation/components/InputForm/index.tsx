import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { classNames } from '~/presentation/helpers'

type Props = {
  label?: string
  placeholder?: string
  type: string
  name?: string
  autoComplete?: string
  readOnly?: true
  required?: true
  formRegister?: UseFormRegisterReturn
  className?: string
  error?: string
}

export const InputForm: React.FC<Props> = props => {
  const inputClasses = classNames(
    props.readOnly
      ? 'bg-gray-50 focus:border-gray-100 focus:ring-gray-100'
      : 'focus:border-blue-400 focus:ring-blue-400',
    'focus:ring-1  focus:outline-none w-full font-light text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-4'
  )

  return (
    <div className={classNames('text-gray-800', props.className)}>
      <div className="grid grid-cols-2 mb-1">
        {props.label && (
          <label htmlFor={props.name} className="block font-medium text-sm">
            {props.label}
          </label>
        )}
        {props.error && (
          <p className="text-right text-sm text-red-600 dark:text-red-500">
            {props.error}
          </p>
        )}
      </div>

      <input
        {...props.formRegister}
        className={inputClasses}
        placeholder={props.placeholder}
        type={props.type}
        id={props.name}
        autoComplete={props.autoComplete}
        required={props.required}
        readOnly={props.readOnly}
      />
    </div>
  )
}
