import React, { PropsWithChildren } from "react";

export const HeaderCell = (props: PropsWithChildren) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {props.children}
    </th>
  );
};
