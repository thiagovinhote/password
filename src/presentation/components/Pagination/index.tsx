import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React from 'react'
import Link from 'next/link'
import { PaginatorTypes } from '~/domain/models/paginator'
import { classNames, range } from '~/presentation/helpers'

type Props = {
  value: PaginatorTypes.Pagination
}

export const Pagination: React.FC<Props> = props => {
  const right = Math.min(
    props.value.currentPage * props.value.perPage,
    props.value.total
  )
  const left = right - Math.min(props.value.perPage, props.value.total) + 1
  const items = range(1, props.value.lastPage + 1)

  const currentStyle = 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
  const defaultStyle = 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Anterior
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Próximo
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando&nbsp;
            <span className="font-medium">{left}&nbsp;</span>a&nbsp;
            <span className="font-medium">{right}&nbsp;</span>de&nbsp;
            <span className="font-medium">{props.value.total}&nbsp;</span>
            resultados
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {items.map(page => (
              <Link passHref key={page} href={{ query: { page } }}>
                <a
                  className={classNames(
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    page === props.value.currentPage
                      ? currentStyle
                      : defaultStyle
                  )}
                >
                  {page}
                </a>
              </Link>
            ))}

            {/* <a
              href="#"
              aria-current="page"
              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              1
            </a>

            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
             */}
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Próximo</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
