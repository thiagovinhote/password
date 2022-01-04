import React, { useImperativeHandle, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { InputForm } from '~/presentation/components/InputForm'
import { SlideOver } from '~/presentation/components/SlideOver'

type Props = {}

type Ref = {
  open: () => void;
}

type FolderFormData = {
  name: string;
}

export const CreateFolderForm = React.forwardRef<Ref,Props>((props, ref) => {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit } = useForm<FolderFormData>()

  const handleSave: SubmitHandler<FolderFormData> = async (data) => {
    // await apiCreateFolder.exec(data)
  }

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true)
      console.log('dassdas')
    }
  }))

  return (
    <SlideOver value={open} onChange={setOpen} title="Nova pasta">
      <form className="border-2 border-gray-300 border-dashed rounded-xl bg-white space-y-4 p-4">
        <InputForm label="Nome" placeholder="Nome" type="text" formRegister={register('name')} />
        <hr />
        <DefaultButton className="w-2/6" color="green" onClick={handleSubmit(handleSave)}>Salvar</DefaultButton>
      </form>
    </SlideOver>
  )
})

export type CreateFolderFormRef = Ref;
