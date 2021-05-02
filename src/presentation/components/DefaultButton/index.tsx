import React from "react";
import { classNames } from "~/presentation/helpers";

type Props = {
  tag?: keyof React.ReactHTML;
  color: 'blue' | 'green' | 'purple' | 'pink' | 'red' | 'yellow' | 'indigo'
  className?: string
}

export const DefaultButton: React.FC<Props> = (props) => {
  const tag = props.tag ?? 'button'

  const buttonClasses = "focus:outline-none rounded text-sm px-4 py-2"
  const colorClasses = `active:text-${props.color}-900 active:bg-${props.color}-300 hover:bg-${props.color}-200 hover:text-${props.color}-800 bg-${props.color}-100 text-${props.color}-600`

  return React.createElement(
    tag,
    { ...props, className: classNames(props.className, buttonClasses, colorClasses) },
    props.children
  )
}
