import { Switch } from "@headlessui/react";
import React from "react";
import { classNames } from "~/presentation/helpers";

type Props = {
  value?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

const switchColors = {
  "enabled_and_on": "bg-blue-600",
  "enabled_and_off": "bg-gray-400",
  'disabled_and_on': "bg-blue-400",
  'disabled_and_off': "bg-gray-200"
}

export const Toggle: React.FC<Props> = (props) => {
  const switchClasses = "relative inline-flex items-center h-6 rounded-full focus:outline-none w-11 transition-colors ease-in-out duration-200"
  const toggleClasses = "inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200"

  const key = [props.disabled ? 'disabled' : 'enabled', props.value ? 'on' : 'off'].join('_and_')
  const switchColor = switchColors[key]
  console.log(key)

  return (
    <Switch
      checked={props.value}
      disabled={props.disabled}
      onChange={props.onChange}
      className={classNames(switchColor, switchClasses)}
    >
      <span className="sr-only">Switch</span>
      <span
        className={classNames(`${props.value ? "translate-x-6" : "translate-x-1"}`, toggleClasses)}
      />
    </Switch>
  )
}
