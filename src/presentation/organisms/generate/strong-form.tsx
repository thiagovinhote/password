import React, { useEffect, useMemo, useState } from 'react'
import { FetchGenerate } from '~/domain/usecases/fetch-generate'
import { Usecase } from '~/domain/usecases/usecase'
import { Select } from '~/presentation/molecules/Select'
import { Toggle } from '~/presentation/molecules/Toggle'
import { classNames, range } from '~/presentation/helpers'
import { OptionItem } from './option-item'
import { OptionsSidebar } from './options-sidebard'
import { PasswordItem } from './password-item'
import { TransitionFade } from './transition-fade'

const sizes = range(16, 65)

type Props = {
  fetchGenerate: Usecase<FetchGenerate.Params, FetchGenerate.Result>
}

export const StrongForm: React.FC<Props> = ({ fetchGenerate }) => {
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [ambiguousCharacters, setAmbiguousCharacters] = useState(false)
  const [passwordSize, setPasswordSize] = useState(sizes[0])
  const [passwords, setPasswords] = useState([])

  const fetchData = async () => {
    const data = await fetchGenerate.exec({
      includeNumbers: true,
      includeSymbols: includeSymbols,
      lowercaseCharacters: true,
      uppercaseCharacters: true,
      noAmbiguousCharacters: !ambiguousCharacters,
      passwordSize: passwordSize
    })
    if (data.isRight()) setPasswords(data.value)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const gridClasses = useMemo(() => {
    return passwordSize >= 35 ? 'grid-cols-1' : 'grid-cols-2'
  }, [passwords])

  return (
    <TransitionFade className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg h-full">
          <div className="px-4 py-5 sm:px-6">
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Robusto o suficiente para manter sua conta de hospedagem na web
              segura.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className={classNames(gridClasses, 'grid px-4 py-5 gap-4')}>
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
            <Select
              value={passwordSize}
              data={sizes}
              onChange={setPasswordSize}
            />
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
            <Toggle value={includeSymbols} onChange={setIncludeSymbols} />
          </OptionItem>
          <OptionItem label="Caracteres Ambíguos">
            <Toggle
              value={ambiguousCharacters}
              onChange={setAmbiguousCharacters}
            />
          </OptionItem>
        </OptionsSidebar>
      </div>
    </TransitionFade>
  )
}
