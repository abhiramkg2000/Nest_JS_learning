import React, { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  testid: string;
  children: ReactNode;
};

function Button({ testid, children }: ButtonProps) {
  return <button data-testid={testid}>{children}</button>;
}

export default Button;
