import { Switch } from "@headlessui/react";
import React, { useState } from "react";

export const Toggle: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? "bg-blue-600" : "bg-gray-200"} relative inline-flex items-center h-6 rounded-full focus:outline-none w-11 transition-colors ease-in-out duration-200`}
    >
      <span className="sr-only">Switch</span>
      <span
        className={`${enabled ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200`}
      />
    </Switch>
  )
}
