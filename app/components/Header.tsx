'use client'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'REW', href: '#', current: true },
  { name: 'Buy', href: '#', current: false },
  { name: 'Rent', href: '#', current: false },
  { name: 'Sell', href: '#', current: false },
  { name: 'New Homes', href: '#', current: false },
  { name: 'Agents', href: '#', current: false },
  { name: 'Mortgages', href: '#', current: false },
  { name: 'The Guide', href: '#', current: false },
]

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="REW Logo"
                src="/rew.png"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right side buttons - Desktop */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
            <button className="text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-4 py-2 text-sm font-medium transition">
              SIGN IN
            </button>
            <button className="bg-gray-600 text-white hover:bg-gray-400 rounded-md px-4 py-2 text-sm font-medium transition">
              SIGN UP
            </button>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
          
          {/* Mobile Sign In/Sign Up buttons */}
          <div className="pt-4 border-t border-gray-700 mt-2">
            <DisclosureButton
              as="button"
              className="w-full text-left text-gray-300 hover:bg-white/5 hover:text-white rounded-md px-3 py-2 text-base font-medium mb-2"
            >
              SIGN IN
            </DisclosureButton>
            <DisclosureButton
              as="button"
              className="w-full text-left bg-gray-600 text-white hover:bg-gray-400 rounded-md px-3 py-2 text-base font-medium"
            >
              SIGN UP
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}