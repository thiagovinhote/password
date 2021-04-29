import { Scaffold } from "~/presentation/components/Scaffold";

export default function OneFile() {
  return (
    <Scaffold title="Um arquivo">
      <div className="grid grid-cols-2 gap-4 py-44 border-2 border-gray-300 border-dashed rounded-xl bg-white">
        <div className="text-center space-y-2">
          <p className="text-3xl font-bold py-4">
            Carrege um arquivo
          </p>
          <span className="block font-semibold">
            Arraste & Solte o arquivo aqui
          </span>
          <p className="text-gray-500">
            ou
          </p>
          <button className="w-1/4 focus:outline-none active:text-green-900 active:bg-green-300 hover:bg-green-200 hover:text-green-800 rounded bg-green-100 text-green-600 text-sm px-4 py-2">
            Navegar
          </button>
          <p className="text-gray-500 text-sm py-2">
            Formatos suportados: CSV, XLS, XLSX, XLSM, TXT
            <span className="block">
              A ordem das colunas no arquivo não é importante
            </span>
          </p>
        </div>
        <div>
          Image
        </div>
      </div>
    </Scaffold>
  )
}
