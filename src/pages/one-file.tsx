import { DefaultButton } from '~/presentation/molecules/DefaultButton'
import { Scaffold } from '~/presentation/molecules/Scaffold'
import { ReactComponent as SubmitSvg } from '../assets/images/submit.svg'

const OneFile: React.FC = () => {
  return (
    <Scaffold title="Um arquivo">
      <div className="grid grid-cols-2 gap-4 py-28 border-2 border-gray-300 border-dashed rounded-xl bg-white">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-3xl font-bold py-4">Carrege um arquivo</p>
          <span className="block">Arraste & Solte o arquivo aqui</span>
          <p className="text-gray-500">ou</p>
          <DefaultButton className="w-1/4" color="blue">
            Navegar
          </DefaultButton>
          <p className="text-gray-500 text-sm py-2">
            Formatos suportados: CSV, XLS, XLSX, XLSM, TXT
            <span className="block">
              A ordem das colunas no arquivo não é importante
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <SubmitSvg className="h-96" />
        </div>
      </div>
    </Scaffold>
  )
}

export default OneFile
