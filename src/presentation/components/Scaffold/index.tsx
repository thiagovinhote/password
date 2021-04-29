import React from 'react'

type Props = {
  title: string
}

export const Scaffold: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <section>
          {children}
        </section>
      </main>
    </div>
  )
}
