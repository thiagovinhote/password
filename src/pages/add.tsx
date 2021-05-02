import { ChipIcon, CogIcon, CubeTransparentIcon } from "@heroicons/react/outline";
import { Scaffold } from "~/presentation/components/Scaffold";
import { CardItem } from '~/presentation/pages/add'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { InputForm } from "~/presentation/components/InputForm";

export default function Add() {
  return (
    <Scaffold title="Adicionar senha">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="font-medium text-lg pb-4">
            Escolha o tipo de criptografia
          </p>
          <div className="space-y-4">
            <CardItem title="AES128" subtitle="Chave com 16 byte (128 bits)" icon={ChipIcon} color="text-green-400" />
            <CardItem title="AES128-CBC" subtitle="Chave com 16 byte (128 bits)" icon={ChipIcon} color="text-purple-400" />
            <CardItem title="AES192" subtitle="Chave com 24 byte (192 bits)" icon={CogIcon} color="text-blue-400" />
            <CardItem title="AES256" subtitle="Chave com 32 byte (256 bits)" icon={CubeTransparentIcon} color="text-pink-400" active />
          </div>
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

