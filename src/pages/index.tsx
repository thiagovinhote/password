import { Scaffold } from "~/presentation/components/Scaffold";
import { CardMenuItem } from "~/presentation/pages/index";

const menuItems = [
  {
    title: 'Manualmente',
    description: 'Adicionar senha manualmente, não sendo possível atualizar posteriormente',
    buttonText: "Adicionar"
  },
  {
    title: 'Senha Forte',
    description: 'Gerar senha aleatóriamente com base em alguns algoritmos',
    buttonText: "Gerar"
  },
  {
    title: 'Compartilhamento',
    description: 'Compartilhe suas credenciais com outros usuários de forma segura',
    buttonText: "Enviar"
  },
  {
    title: 'Importe/Exporte',
    description: 'Baixe ou carregue suas senha com um clique e de forma simples',
    buttonText: "Importar/Exportar"
  }
]

export default function Home() {
  return (
    <Scaffold title="Dashboard">
      <ul className="grid grid-cols-4 gap-4">
        {menuItems.map(item => (
          <li className="flex" key={item.title}>
            <CardMenuItem
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              onClickButton={() => {}}
            />
          </li>
        ))}
      </ul>
    </Scaffold>
  )
}
