import { Badge } from '~/presentation/components/Badge'
import { Scaffold } from '~/presentation/components/Scaffold'
import { DataCell, HeaderCell } from '~/presentation/components/Table'

const passwords = [
  {
    id: '1',
    name: 'Senha da AWS',
    account: 'thiago.vinhote',
    cryptography: 'AES192',
    created_at: '2021-05-02T19:36:00'
  },
  {
    id: '2',
    name: 'Senha do Facebook 1',
    account: 'thiagovf26@outlook.com',
    cryptography: 'AES128',
    created_at: '2021-04-15T12:29:00'
  },
]

const cryptographyColorByColors = {
  'AES128': 'green',
  'AES128-CBC': 'purple',
  'AES192': 'blue',
  'AES256': 'pink'
}

export default function Passwords() {

  return (
    <Scaffold title="Passwords">
      <div className="overflow-hidden border-2 border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <HeaderCell>
                Nome
              </HeaderCell>
              <HeaderCell>
                Conta
              </HeaderCell>
              <HeaderCell>
                Ciptografia
              </HeaderCell>
              <HeaderCell>
                Criação
              </HeaderCell>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {passwords.map((password) => (
              <tr key={password.id}>
                <DataCell>
                  <span className="text-sm text-gray-900">{password.name}</span>
                </DataCell>
                <DataCell>
                  <h4 className="text-sm font-medium text-gray-900">{password.account}</h4>
                </DataCell>
                <DataCell>
                  <Badge color={cryptographyColorByColors[password.cryptography]}>
                    {password.cryptography}
                  </Badge>
                </DataCell>
                <DataCell>
                  <span className="text-sm text-gray-500">
                    {password.created_at}
                  </span>
                </DataCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Scaffold>
  )
}
