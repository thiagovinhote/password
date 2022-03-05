import React, { useImperativeHandle, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateFolder } from '~/domain/usecases/create-folder'
import { Usecase } from '~/domain/usecases/usecase'
import { DefaultButton } from '~/presentation/atoms/DefaultButton'
import { InputForm } from '~/presentation/molecules/InputForm'
import { SlideOver } from '~/presentation/molecules/SlideOver'

type Props = {
  createFolder: Usecase<CreateFolder.Params, CreateFolder.Result>
}

type Ref = {
  open: () => void
}

type FolderFormData = {
  name: string
}

export const CreateFolderForm = React.forwardRef<Ref, Props>((props, ref) => {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit } = useForm<FolderFormData>()

  const handleSave: SubmitHandler<FolderFormData> = async data => {
    await props.createFolder.exec(data)
  }

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true)
    }
  }))

  return (
    <SlideOver value={open} onChange={setOpen} title="Nova pasta">
      <form className="border-2 border-gray-300 border-dashed rounded-xl bg-white space-y-4 p-4">
        <InputForm
          label="Nome"
          placeholder="Nome"
          type="text"
          formRegister={register('name')}
        />
        <hr />
        <DefaultButton
          className="w-2/6"
          color="green"
          onClick={handleSubmit(handleSave)}
        >
          Salvar
        </DefaultButton>
      </form>
    </SlideOver>
  )
})

export type CreateFolderFormRef = Ref
