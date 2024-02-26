import React, { createContext, useState } from "react";

type ListCryptographyValue = {
  selected: string;
  selectItem: (value: string) => void;
};

export const ListCryptographyContext = createContext(
  {} as ListCryptographyValue,
);

export const ListCryptographyProvider: React.FC = (props) => {
  const [currentIndex, setCurrentIndex] = useState(undefined);

  const initialValue: ListCryptographyValue = {
    selected: currentIndex,
    selectItem: setCurrentIndex,
  };

  return (
    <ListCryptographyContext.Provider value={initialValue}>
      {props.children}
    </ListCryptographyContext.Provider>
  );
};
