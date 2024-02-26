import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export const DataCell = (props) => {
  return (
    <td className={["px-6 py-4 whitespace-nowrap", props.className].join(" ")}>
      {props.children}
    </td>
  );
};
