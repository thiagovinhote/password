import { Scaffold } from "~/presentation/components/Scaffold";
import { CardMenuItem, Props as CardMenuItemProps } from "~/presentation/pages/index";

const menuItems: CardMenuItemProps[] = [
  {
    title: 'Manualmente',
    description: 'Adicionar senha manualmente, não sendo possível atualizar posteriormente',
    linkText: "Adicionar",
    linkTo: { href: "/add" }
  },
  {
    title: 'Senha Forte',
    description: 'Gerar senha aleatóriamente com base em alguns algoritmos',
    linkText: "Gerar",
    linkTo: { href: "/generate" }
  },
  {
    title: 'Compartilhamento',
    description: 'Compartilhe suas credenciais com outros usuários de forma segura',
    linkText: "Enviar",
    linkTo: { href: "/send" }
  },
  {
    title: 'Um arquivo',
    description: 'Baixe ou carregue suas senha com um clique e de forma simples',
    linkText: "Importar/Exportar",
    linkTo: { href: "/one-file" }
  }
]

export default function Home() {
  return (
    <Scaffold title="Dashboard">
      <ul className="grid grid-cols-4 gap-4">
        {menuItems.map(item => (
          <li className="flex" key={item.title}>
            <CardMenuItem {...item} />
          </li>
        ))}
      </ul>
    </Scaffold>
  )
}
