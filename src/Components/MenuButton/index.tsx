import { PropsWithChildren } from "react";
import "./MenuButton.css";

const MenuButton = ({
  children,
  className,
  ...props
}: PropsWithChildren<JSX.IntrinsicElements["button"]>) => (
  <button className={`topbar-button ${className}`} {...props}>
    {children}
  </button>
);

export default MenuButton;
