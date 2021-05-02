import React, { useContext } from "react";
import { classNames } from "~/presentation/helpers";
import { ListCryptographyContext } from "./list-cryptography-context";

type Props = {
  title: string;
  subtitle: string;
  value: string;
  color?: string;
  icon?: React.FC<any>
  active?: boolean
}

export const ItemCryptography: React.FC<Props> = (props) => {
  const { selectItem } = useContext(ListCryptographyContext)
  const Icon = props.icon
  const activeClasses = props.active === true ? "border-2 border-green-300" : "border-2 hover:border-blue-200"
  const cardClasses = classNames("flex space-x-2 p-3 cursor-pointer rounded-xl bg-white", activeClasses)

  return (
    <li onClick={() => selectItem(props.value)} className={cardClasses}>
      <div className="flex items-center">
        {Icon && <Icon className={classNames("h-10 w-auto", props.color)} />}
      </div>
      <div className="">
        <span className="font-bold block">{props.title}</span>
        <small className="text-gray-400">{props.subtitle}</small>
      </div>
    </li>
  )
}
