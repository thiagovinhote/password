import React, { Fragment } from 'react'
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { classNames } from '~/presentation/helpers';

type Props<T> = T extends number | string ? {
  value: string | number
  data: (string | number)[]
  labelProp?: never
  valueProp?: never
  onChange?: (value: T) => void
} : {
  value: T
  data: T[],
  labelProp: keyof T
  valueProp: keyof T
  onChange?: (value: T) => void
}


export const Select = <T,>(props: Props<T>) => {
  const current = typeof props.value === "object" ? props.value : { 'label': props.value, value: props.value } as {[key: string]: string | number}
  const labelProp = (props.labelProp ?? 'label') as string
  const valueProp = (props.valueProp ?? 'value') as string

  const items = props.data.map((item: number | string | T) => {
    return typeof item === "object" ? item : { [labelProp]: item, [valueProp]: item } as {[key: string]: string | number}
  })

  const handleOnChange = (selected: T | {[key: string]: string | number}) => {
    const value = typeof props.value === "object" ? selected : selected[valueProp]
    props.onChange(value)
  }

  return (
    <Listbox value={current} onChange={handleOnChange}>
      {({ open }) => (
        <Fragment>
          <div className="relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-1 block truncate">{current[labelProp]}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {items.map((item) => (
                  <Listbox.Option
                    key={item[valueProp]}
                    className={({ active }) => classNames(active ? 'text-white bg-blue-600' : 'text-gray-800', 'cursor-default select-none relative py-2 pl-1 pr-9')}
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                            {item[labelProp]}
                          </span>
                        </div>

                        {selected && (
                          <span className={classNames(active ? 'text-white' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Fragment>
      )}
    </Listbox>
  )
}
