import { Transition } from "@headlessui/react";
import React, { useMemo, useState } from "react";

export const PasswordItem: React.FC = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleOnClick = async () => {
    setShowTooltip(true);
    await navigator.clipboard.writeText(props.children.toString());
    setTimeout(() => {
      setShowTooltip(false);
    }, 600);
  };

  const Tooptip = useMemo(
    () => (
      <div className="relative -top-10">
        <div className="absolute text-center top-0 z-10 w-20 p-2 -mt-1 text-sm leading-tight text-white bg-blue-500 rounded-lg shadow-lg transform -translate-y-full">
          Copiado!
        </div>
        <svg
          className="absolute z-10 w-6 h-6 text-blue-500 fill-current stroke-current transform -translate-y-3"
          width="8"
          height="8"
        >
          <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
        </svg>
      </div>
    ),
    [props.children],
  );

  return (
    <div>
      <div
        className="text-center border-2 border-gray-200 hover:border-blue-200 cursor-pointer rounded-lg p-2"
        onClick={handleOnClick}
      >
        {props.children}
      </div>
      <Transition
        show={showTooltip}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {Tooptip}
      </Transition>
    </div>
  );
};
