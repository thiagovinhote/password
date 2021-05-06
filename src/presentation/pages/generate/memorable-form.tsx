import { PaperClipIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { DefaultButton } from "~/presentation/components/DefaultButton";
import { Toggle } from "~/presentation/components/Toggle";
import { PasswordItem } from "./password-item";

type FetchGenerateParams = {
  include_numbers: boolean
  lowercase_characters: boolean
  uppercase_characters: boolean
}

const fetchGenerate = async (params?: FetchGenerateParams) => {
  const response = await fetch('http://localhost:4000/api/generate', {
    body: params ? JSON.stringify(params) : null,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const data = await response.json()

  return data as { result: string[] }
}

export const MemorableForm: React.FC = () => {
  const [includeNumbers, setIncludeNumber] = useState(true)
  const [uppercaseCharacters, setUppercaseCharacters] = useState(true)
  const [lowercaseCharacters, setLowercaseCharacters] = useState(true)

  const [passwords, setPasswords] = useState([])

  const fetchData = async () => {
    const data = await fetchGenerate({
      include_numbers: includeNumbers,
      lowercase_characters: lowercaseCharacters,
      uppercase_characters: uppercaseCharacters
    })
    setPasswords(data.result)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg h-full">
          <div className="px-4 py-5 sm:px-6">
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Perfeito para proteger seu computador ou dispositivo móvel, ou em algum lugar que seja detectável força bruta.
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
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Opções</h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                <dt className="flex flex-col justify-center text-sm font-medium text-gray-500">Incluir Números</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                  <Toggle value={includeNumbers} onChange={setIncludeNumber} />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                <dt className="flex flex-col justify-center text-sm font-medium text-gray-500">Caracteres Minúsculos</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                  <Toggle value={lowercaseCharacters} onChange={setLowercaseCharacters} />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                <dt className="flex flex-col justify-center text-sm font-medium text-gray-500">Caracteres Maiúsculos</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                  <Toggle value={uppercaseCharacters} onChange={setUppercaseCharacters} />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 flex justify-center my-2">
                <DefaultButton onClick={fetchData} className="w-1/2" color="blue">Atualizar</DefaultButton>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
