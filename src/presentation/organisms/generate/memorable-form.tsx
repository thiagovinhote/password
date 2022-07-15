import React, { useEffect, useState } from 'react'
import { FetchGenerate } from '~/domain/usecases/fetch-generate'
import { Usecase } from '~/domain/usecases/usecase'
import { Select } from '~/presentation/molecules/Select'
import { Toggle } from '~/presentation/molecules/Toggle'
import { range } from '~/presentation/helpers'
import { OptionItem } from './option-item'
import { OptionsSidebar } from './options-sidebard'
import { PasswordItem } from './password-item'
import { TransitionFade } from './transition-fade'

const sizes = range(6, 16)

type Props = {
  fetchGenerate: Usecase<FetchGenerate.Params, FetchGenerate.Result>
}

export const MemorableForm: React.FC<Props> = ({ fetchGenerate }) => {
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [uppercaseCharacters, setUppercaseCharacters] = useState(true)
  const [lowercaseCharacters, setLowercaseCharacters] = useState(true)
  const [passwordSize, setPasswordSize] = useState(sizes[0])

  const [passwords, setPasswords] = useState([])

  const fetchData = async () => {
    const data = await fetchGenerate.exec({
      includeNumbers,
      includeSymbols: false,
      lowercaseCharacters,
      uppercaseCharacters,
      noAmbiguousCharacters: false,
      passwordSize: passwordSize
    })
    if (data.isRight()) setPasswords(data.value)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <TransitionFade className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg h-full">
          <div className="px-4 py-5 sm:px-6">
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Perfeito para proteger seu computador ou dispositivo móvel, ou em
              algum lugar que seja detectável força bruta.
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
            <Select
              value={passwordSize}
              data={sizes}
              onChange={setPasswordSize}
            />
          </OptionItem>
          <OptionItem label="Incluir Números">
            <Toggle value={includeNumbers} onChange={setIncludeNumbers} />
          </OptionItem>
          <OptionItem label="Caracteres Minúsculos">
            <Toggle
              value={lowercaseCharacters}
              onChange={setLowercaseCharacters}
            />
          </OptionItem>
          <OptionItem label="Caracteres Maiúsculos">
            <Toggle
              value={uppercaseCharacters}
              onChange={setUppercaseCharacters}
            />
          </OptionItem>
        </OptionsSidebar>
      </div>
    </TransitionFade>
  )
}
