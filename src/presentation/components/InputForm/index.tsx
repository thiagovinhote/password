import React from "react";

type Props = {
  label: string
  placeholder?: string
  type: string
  name?: string
}

export const InputForm: React.FC<Props> = (props) => {
  return (
    <div className="text-gray-800">
      {props.name && <label htmlFor={props.name} className="block font-medium text-sm mb-1">{props.label}</label>}
      <input
        className="focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none w-full font-light text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-4"
        placeholder={props.placeholder}
        type={props.type}
        id={props.name}
      />
    </div>
  )
}
