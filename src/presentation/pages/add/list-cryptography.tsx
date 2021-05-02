import React, { useContext, useEffect } from "react";
import { ChipIcon, CogIcon, CubeTransparentIcon } from "@heroicons/react/outline";
import { ItemCryptography } from "./item-cryptography";
import { ListCryptographyContext } from "./list-cryptography-context";

type Props = {
  onChange: (value: string) => void
}

const itens = [
  {
    title: "AES128",
    subtitle: "Chave com 16 byte (128 bits)",
    icon: ChipIcon,
    color: "text-green-400",
    value: "aes128"
  },
  {
    title: "AES128-CBC",
    subtitle: "Chave com 16 byte (128 bits)",
    icon: ChipIcon,
    color: "text-purple-400",
    value: "aes128-cbc"
  },
  {
    title: "AES192",
    subtitle: "Chave com 24 byte (192 bits)",
    icon: CogIcon,
    color: "text-blue-400",
    value: "aes192"
  },
  {
    title: "AES256",
    subtitle: "Chave com 32 byte (256 bits)",
    icon: CubeTransparentIcon,
    color: "text-pink-400",
    value: "aes256"
  },
]

export const ListCryptography: React.FC<Props> = (props) => {
  const { selected } = useContext(ListCryptographyContext)

  useEffect(() => {
    props.onChange(selected)
  }, [selected])

  return (
    <ul className="space-y-4">
      {itens.map(item => (
        <ItemCryptography
          active={selected === item.value}
          value={item.value}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
          color={item.color} />
      ))}
    </ul>
  )
}
