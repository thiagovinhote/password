import { useState } from "react";
import { Scaffold } from "~/presentation/components/Scaffold";
import { ListCryptography, ListCryptographyProvider } from '~/presentation/pages/add'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { InputForm } from "~/presentation/components/InputForm";
import { FeedbackAlert } from "~/presentation/components/Alert";
import { CheckIcon } from "@heroicons/react/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { makeApiCreateCredential } from "~/main/factories/usecases";
import { useRouter } from "next/router";
import { TextAreaForm } from "~/presentation/components/TextAreaForm";

type CredentialFormData = {
  name: string;
  username: string;
  password: string;
  description?: string;
}

const apiCreateCredential = makeApiCreateCredential()

export default function Add() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<CredentialFormData>()
  const [showAlert, setShowAlert] = useState(false)
  const [cryptography, setCryptography] = useState(undefined)

  const handleSave: SubmitHandler<CredentialFormData> = async (data) => {
    await apiCreateCredential.exec({ ...data, folderId: router.query.folder_id as string });

    setShowAlert(!showAlert)
  }

  return (
    <Scaffold title="Adicionar senha">
      <FeedbackAlert
        data={{
          title: 'Nova credencial',
          description: 'Suas credenciais foram salvas e criptografas',
          icon: CheckIcon,
          color: "green"
        }}
        show={showAlert}
        onDismiss={() => { router.push('/credentials') }}
      />

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
          <form onSubmit={handleSubmit(handleSave)} className="border-2 border-gray-300 border-dashed rounded-xl bg-white space-y-4 p-8">
            <InputForm label="Nome" placeholder="Dê uma nome para as suas credenciais" type="text" formRegister={register('name')} />
            <hr />
            <InputForm label="Email / Username" placeholder="Informe sua conta" type="text" formRegister={register('username')} />
            <InputForm label="Senha" placeholder="Digite sua senha" type="password" formRegister={register('password')} />
            <TextAreaForm label="Descrição" placeholder="Informações extras sobre a credencial" formRegister={register('description')} rows={2} />
            <DefaultButton className="w-2/6" color="green" attrs={{ type: 'submit' }} >Salvar</DefaultButton>
          </form>
        </div>
      </div>
    </Scaffold>
  )
}

