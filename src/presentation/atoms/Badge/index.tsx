import React from "react";

import { classNames } from "~/presentation/helpers";

type Props = {
  color: "blue" | "green" | "purple" | "pink" | "red" | "yellow" | "indigo";
};

export const Badge: React.FC<Props> = (props) => {
  const defaultClasses =
    "px-2 inline-flex text-xs leading-5 font-semibold border rounded-full";
  const colorClasses = `bg-${props.color}-100 text-${props.color}-800 border-${props.color}-200`;

  return (
    <span className={classNames(defaultClasses, colorClasses)}>
      {props.children}
    </span>
  );
};
