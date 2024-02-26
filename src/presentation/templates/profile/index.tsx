import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Paginator } from "~/domain/models/paginator";
import { Tag } from "~/domain/models/tag";
import { User } from "~/domain/models/user";
import { DefaultButton } from "~/presentation/atoms/DefaultButton";
import { DataCell, HeaderCell } from "~/presentation/atoms/Table";
import { InputForm } from "~/presentation/molecules/InputForm";
import { Scaffold } from "~/presentation/molecules/Scaffold";

type Props = {
  user: User;
  tags: Paginator<Tag>;
  onLoadTags: (term: string) => Promise<void>;
  onChangePicture: (picture: File) => Promise<void>;
};

type TagsFormData = {
  value: string;
};

export type { Props as IndexTemplateProps };

export const IndexTemplate: React.FC<Props> = (props) => {
  const tagsForm = useForm<TagsFormData>();
  const [pictureIsSaving, setPictureIsSaving] = useState(false);
  const pictureUrl =
    props.user.pictureUrl?.toString() ?? "/images/profile-picture.jpeg";

  const handleSearchTags: SubmitHandler<TagsFormData> = async (data) => {
    await props.onLoadTags(data.value);
  };

  const handleChangePicture = async (event: ChangeEvent<HTMLInputElement>) => {
    setPictureIsSaving(true);
    const { files } = event.target;
    const picture = files?.item(0);
    if (!picture) {
      return;
    }
    await props.onChangePicture(picture);
    setPictureIsSaving(false);
  };

  return (
    <Scaffold title="Perfil">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-auto">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Usuário
            </h3>
          </div>
          <div className="border-t border-gray-200 space-y-4 p-6">
            <div className="flex flex-col items-center pb-10 mt-8">
              <img
                className="mb-3 w-24 h-24 rounded-full shadow-lg"
                src={pictureUrl}
                alt={props.user.name}
              />
              <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {props.user.name}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {props.user.email}
              </span>

              <DefaultButton
                tag="label"
                attrs={{ htmlFor: "picture-upload" }}
                color="yellow"
                className="cursor-pointer mt-2 py-1.5 px-3"
                loading={pictureIsSaving}
              >
                {pictureIsSaving ? (
                  <span>Alterando foto</span>
                ) : (
                  <span>Alterar foto</span>
                )}
                <input
                  id="picture-upload"
                  name="picture-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  disabled={pictureIsSaving}
                  onChange={handleChangePicture}
                />
              </DefaultButton>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Tags
            </h3>
          </div>

          <form
            className="border-t border-gray-200 p-4 flex items-center justify-between space-x-3"
            onSubmit={tagsForm.handleSubmit(handleSearchTags)}
          >
            <InputForm
              placeholder="Buscar tags pelo nome"
              type="text"
              formRegister={tagsForm.register("value")}
              className="w-full"
            />
          </form>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <HeaderCell>Nome</HeaderCell>
                <HeaderCell>Cor</HeaderCell>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {props.tags.data.map((tag) => (
                <tr key={tag.id}>
                  <DataCell>
                    <span className="text-sm text-gray-900">{tag.label}</span>
                  </DataCell>
                  <DataCell>
                    <div
                      style={{ backgroundColor: tag.color }}
                      className="h-5 w-5 rounded"
                    />
                  </DataCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Scaffold>
  );
};
