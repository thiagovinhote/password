import React, { Fragment } from 'react'

type Props = {
  title: string
  append?: () => React.ReactNode
}

export const Scaffold: React.FC<Props> = (props) => {
  return (
    <Fragment>
      <header className="shadow">
        <div className="lg:flex lg:items-center lg:justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{props.title}</h2>
          </div>
          <div className="flex lg:mt-0 lg:ml-4">
            {props.append?.()}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <section>
          {props.children}
        </section>
      </main>
    </Fragment>
  )
}

