import React, { useEffect, useState } from "react";
import { FetchGenerate } from "~/domain/usecases/fetch-generate";
import { Usecase } from "~/domain/usecases/usecase";
import { DefaultButton } from "~/presentation/components/DefaultButton";
import { InputForm } from "~/presentation/components/InputForm";
import { Toggle } from "~/presentation/components/Toggle";
import { PasswordItem } from "./password-item";
import { SelectSize } from "./select-size";

const sizes = [{ label: '5', value: 5}, { label: '10', value: 10 }, { label: '15', value: 15}]

type Props = {
  fetchGenerate: Usecase<FetchGenerate.Params, FetchGenerate.Result>
}

export const MemorableForm: React.FC<Props> = ({ fetchGenerate }) => {
  const [includeNumbers, setIncludeNumber] = useState(true)
  const [uppercaseCharacters, setUppercaseCharacters] = useState(true)
  const [lowercaseCharacters, setLowercaseCharacters] = useState(true)
  const [passwordSize, setPasswordSize] = useState(sizes[0])

  const [passwords, setPasswords] = useState([])

  const fetchData = async () => {
    const data = await fetchGenerate.exec({
      includeNumbers,
      lowercaseCharacters,
      uppercaseCharacters,
      passwordSize: passwordSize.value
    })
    setPasswords(data)
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
              <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                <dt className="flex flex-col justify-center text-sm font-medium text-gray-500">Tamanho da senha</dt>
                <dd>
                  <SelectSize data={sizes} value={passwordSize} onChange={setPasswordSize} />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                <dt className="flex flex-col justify-center text-sm font-medium text-gray-500">Incluir Números</dt>
                <dd>
                  <Toggle value={includeNumbers} onChange={setIncludeNumber} />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 grid grid-cols-2 gap-4 px-6">
                <dt className="flex flex-col justify-center text-sm font-medium text-gray-500">Caracteres Minúsculos</dt>
                <dd>
                  <Toggle value={lowercaseCharacters} onChange={setLowercaseCharacters} />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 grid grid-cols-2 gap-4 px-6">
                <dt className="flex flex-col justify-center text-sm font-medium text-gray-500">Caracteres Maiúsculos</dt>
                <dd>
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
