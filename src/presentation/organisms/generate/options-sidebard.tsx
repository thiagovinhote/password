import React, { ReactElement } from 'react'
import { DefaultButton } from '~/presentation/atoms/DefaultButton'
import { classNames } from '~/presentation/helpers'
import { Props as OptionItemProps } from './option-item'

type Props = {
  children: ReactElement<OptionItemProps>[]
  onFetch?: () => void
}

export const OptionsSidebar: React.FC<Props> = props => {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children]

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Opções</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {children.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  index % 2 ? 'bg-gray-50' : 'bg-white',
                  'px-4 py-5 grid grid-cols-2 gap-4 px-6'
                )}
              >
                <dt className="flex flex-col justify-center text-sm font-medium text-gray-500">
                  {item.props.label}
                </dt>
                <dd>{item}</dd>
              </div>
            )
          })}
          <div
            className={classNames(
              children.length % 2 ? 'bg-gray-50' : 'bg-white',
              'px-4 py-5 flex justify-center my-2'
            )}
          >
            <DefaultButton
              onClick={props.onFetch}
              className="w-1/2"
              color="blue"
            >
              Atualizar
            </DefaultButton>
          </div>
        </dl>
      </div>
    </div>
  )
}
