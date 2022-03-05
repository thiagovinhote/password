import React, { Fragment } from 'react'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import { ReactComponent as LogoSvg } from '../../../assets/images/padlock.svg'
import { NavBarLink } from './NavBarLink'
import { useAuth } from '~/presentation/hooks'

const profile = [
  { name: 'Seu perfil', href: '/profile' },
  { name: 'Sair', href: '/auth/logout' }
]

export const NavBar: React.FC = () => {
  const { user } = useAuth()

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open, close }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <LogoSvg className="h-8 w-8" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <NavBarLink href="/" onClick={close}>
                      Dashboard
                    </NavBarLink>
                    <NavBarLink href="/credentials" onClick={close}>
                      Credenciais
                    </NavBarLink>
                    <NavBarLink href="/generate" onClick={close}>
                      Generate
                    </NavBarLink>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none">
                            <span className="sr-only">Open user menu</span>
                            <div className="group relative text-right">
                              <span className="-m-2 px-2 py-1 block text-white">
                                {user?.name ?? 'Faça o login'}
                              </span>
                              <span className="-m-2 px-2 py-1 block font-medium text-white">
                                {user?.email}
                              </span>
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {profile.map(item => (
                              <Menu.Item key={item.href}>
                                <Link href={item.href} passHref>
                                  <a
                                    className={
                                      'hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700'
                                    }
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                  <button className="ml-3 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavBarLink href="/" vertical onClick={close}>
                Dashboard
              </NavBarLink>
              <NavBarLink href="/credentials" vertical onClick={close}>
                Credenciais
              </NavBarLink>
              <NavBarLink href="/generate" vertical onClick={close}>
                Generate
              </NavBarLink>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div>
                  <div className="text-base font-medium leading-none text-white">
                    {user?.name ?? 'Faça o login'}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user?.email}
                  </div>
                </div>
                <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {profile.map(item => (
                  <Link key={item.href} href={item.href} passHref>
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
