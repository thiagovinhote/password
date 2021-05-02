import React from "react";
import { classNames } from "~/presentation/helpers";

type Props = {
  title: string;
  subtitle: string;
  color?: string;
  icon?: React.FC<any>
  active?: boolean
}

export const CardItem: React.FC<Props> = (props) => {
  const Icon = props.icon
  const activeClasses = props.active === true ? "border-2 border-green-200" : ""
  const cardClasses = classNames("flex space-x-2 p-3 cursor-pointer rounded-xl bg-white border-2 hover:border-blue-200", activeClasses)

  return (
    <div className={cardClasses}>
      <div className="flex items-center">
        {Icon && <Icon className={classNames("h-10 w-auto", props.color)} />}
      </div>
      <div className="">
        <span className="font-bold block">{props.title}</span>
        <small className="text-gray-400">{props.subtitle}</small>
      </div>
    </div>
  )
}
