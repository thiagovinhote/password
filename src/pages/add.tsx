import { useState } from "react";
import { Scaffold } from "~/presentation/components/Scaffold";
import { ListCryptography, ListCryptographyProvider } from '~/presentation/pages/add'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { InputForm } from "~/presentation/components/InputForm";

export default function Add() {
  const [cryptography, setCryptography] = useState(undefined)

  return (
    <Scaffold title="Adicionar senha">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="font-medium text-lg pb-4">
            Escolha o tipo de criptografia
          </p>
          <ListCryptographyProvider>
            <ListCryptography onChange={setCryptography} />
          </ListCryptographyProvider>
        </div>
        <div>
          <p className="font-medium text-lg pb-4">
            Informe suas credenciais
          </p>
          <form onSubmit={(event) => { event.preventDefault() }} className="border-2 border-gray-300 border-dashed rounded-xl bg-white space-y-4 p-8">
            <InputForm label="Nome" placeholder="Dê uma nome para as suas credenciais" type="text" name="name" />
            <hr />
            <InputForm label="Email / Username" placeholder="Informe sua conta" type="email" name="email" />
            <InputForm label="Senha" placeholder="Digite sua senha" type="password" name="password" />
            <DefaultButton className="w-2/6" color="green">Salvar</DefaultButton>
          </form>
        </div>
      </div>
    </Scaffold>
  )
}

