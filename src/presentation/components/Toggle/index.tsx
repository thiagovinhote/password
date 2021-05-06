import { Switch } from "@headlessui/react";
import React from "react";
import { classNames } from "~/presentation/helpers";

type Props = {
  value?: boolean
  onChange?: (value: boolean) => void
}

export const Toggle: React.FC<Props> = (props) => {
  const switchClasses = "relative inline-flex items-center h-6 rounded-full focus:outline-none w-11 transition-colors ease-in-out duration-200"
  const toggleClasses = "inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200"

  return (
    <Switch
      checked={props.value}
      onChange={props.onChange}
      className={classNames(`${props.value ? "bg-blue-600" : "bg-gray-200"}`, switchClasses)}
    >
      <span className="sr-only">Switch</span>
      <span
        className={classNames(`${props.value ? "translate-x-6" : "translate-x-1"}`, toggleClasses)}
      />
    </Switch>
  )
}
