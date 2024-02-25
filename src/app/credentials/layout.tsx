import { Fragment, ReactNode } from "react";

interface CredentialsLayoutProps {
  children?: ReactNode;
  modal?: ReactNode;
}

export default function CredentialsLayout(props: CredentialsLayoutProps) {
  return (
    <Fragment>
      {props.children}
      {props.modal}
    </Fragment>
  );
}
