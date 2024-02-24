import { CogIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { makeApiCreateCredential } from "~/main/factories/usecases";
import { DefaultButton } from "~/presentation/atoms/DefaultButton";
import { FeedbackAlert } from "~/presentation/molecules/Alert";
import { InputForm } from "~/presentation/molecules/InputForm";
import { Scaffold } from "~/presentation/molecules/Scaffold";
import { TextAreaForm } from "~/presentation/molecules/TextAreaForm";
import {
  ListCryptography,
  ListCryptographyProvider,
} from "~/presentation/organisms/add";

type CredentialFormData = {
  name: string;
  username: string;
  password: string;
  description?: string;
};

const apiCreateCredential = makeApiCreateCredential();

const Add: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CredentialFormData>();
  const [showAlert, setShowAlert] = useState(false);
  const [, setCryptography] = useState(undefined);

  const handleSave: SubmitHandler<CredentialFormData> = async (data) => {
    await apiCreateCredential.exec({
      ...data,
      folderId: (router.query.folder_id as string) ?? "",
    });

    setShowAlert(!showAlert);
  };

  const scaffoldAppend = () => {
    return (
      <Fragment>
        <span className="sm:ml-3">
          <Link href={{ pathname: "/credentials" }} passHref legacyBehavior>
            <DefaultButton
              tag="a"
              color="gray"
              className="inline-flex border border-transparent py-1.5 px-3"
            >
              <ArrowLeftIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-600"
                aria-hidden="true"
              />
              Voltar
            </DefaultButton>
          </Link>
        </span>
      </Fragment>
    );
  };

  return (
    <Scaffold title="Adicionar senha" append={scaffoldAppend}>
      <FeedbackAlert
        data={{
          title: "Nova credencial",
          description: "Suas credenciais foram salvas e criptografas",
          icon: CogIcon,
          color: "green",
        }}
        show={showAlert}
        onDismiss={() => {
          router.push("/credentials");
        }}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="hidden sm:block">
          <p className="font-medium text-lg pb-4">
            Escolha o tipo de criptografia
          </p>
          <ListCryptographyProvider>
            <ListCryptography onChange={setCryptography} />
          </ListCryptographyProvider>
        </div>
        <div>
          <p className="font-medium text-lg pb-4">Informe suas credenciais</p>
          <form
            onSubmit={handleSubmit(handleSave)}
            className="border-2 border-gray-300 border-dashed rounded-xl bg-white space-y-4 p-4 sm:p-8"
          >
            <InputForm
              label="Nome"
              placeholder="Dê uma nome para as suas credenciais"
              type="text"
              formRegister={register("name")}
            />
            <hr />
            <InputForm
              label="Email / Username"
              placeholder="Informe sua conta"
              type="text"
              formRegister={register("username")}
            />
            <InputForm
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              formRegister={register("password")}
            />
            <TextAreaForm
              label="Descrição"
              placeholder="Informações extras sobre a credencial"
              formRegister={register("description")}
              rows={2}
            />
            <DefaultButton
              className="w-2/6"
              color="green"
              attrs={{ type: "submit" }}
            >
              Salvar
            </DefaultButton>
          </form>
        </div>
      </div>
    </Scaffold>
  );
};

export default Add;
