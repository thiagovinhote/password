import React, { Fragment } from 'react'
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { classNames } from '~/presentation/helpers';
import { DefaultButton } from '../DefaultButton';

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
  const current = typeof props.value === "object" ? props.value : { 'label': props.value, value: props.value } as { [key: string]: string | number }
  const labelProp = (props.labelProp ?? 'label') as string
  const valueProp = (props.valueProp ?? 'value') as string

  const items = props.data.map((item: number | string | T) => {
    return typeof item === "object" ? item : { [labelProp]: item, [valueProp]: item } as { [key: string]: string | number }
  })

  const handleOnChange = (selected: T | { [key: string]: string | number }) => {
    const value = typeof props.value === "object" ? selected : selected[valueProp]
    props.onChange(value)
  }

  return (
    <Listbox value={current} onChange={handleOnChange}>
      {({ open }) => (
        <Fragment>
          <div className="relative">
            <DefaultButton tag={Listbox.Button} color="white" className="inline-flex border border-gray-300 px-3 py-1.5">
              {current[labelProp]}
              <SelectorIcon className="-mr-1 ml-2 h-5 w-5 text-gray-600" aria-hidden="true" />
            </DefaultButton>

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
