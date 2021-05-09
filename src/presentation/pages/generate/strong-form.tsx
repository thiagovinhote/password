import React, { useState } from 'react'
import { Select } from '~/presentation/components/Select'
import { Toggle } from '~/presentation/components/Toggle'
import { OptionItem } from './option-item'
import { OptionsSidebar } from './options-sidebard'
import { PasswordItem } from './password-item'

const sizes = [10, 15, 20]

export const StrongForm: React.FC = () => {
  const [includeSymbol, setIncludeSymbol] = useState(true)
  const [passwordSize, setPasswordSize] = useState(sizes[0])
  const [passwords, setPasswords] = useState([])

  const fetchData = () => {}

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg h-full">
          <div className="px-4 py-5 sm:px-6">
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Robusto o suficiente para manter sua conta de hospedagem na web segura.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-4 px-4 py-5 gap-4">
              {passwords.map((item, index) => (
                <PasswordItem key={index}>{item}</PasswordItem>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <OptionsSidebar onFetch={fetchData}>
          <OptionItem label="Tamanho da senha">
            <Select value={passwordSize} data={sizes} onChange={setPasswordSize} />
          </OptionItem>
          <OptionItem label="Incluir Números">
            <Toggle value={true} disabled />
          </OptionItem>
          <OptionItem label="Caracteres Minúsculos">
            <Toggle value={true} disabled />
          </OptionItem>
          <OptionItem label="Caracteres Maiúsculos">
            <Toggle value={true} disabled />
          </OptionItem>
          <OptionItem label="Incluir Símbolos">
            <Toggle value={includeSymbol} onChange={setIncludeSymbol} />
          </OptionItem>
        </OptionsSidebar>
      </div>
    </div>
  )
}
