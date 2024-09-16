import { PropsWithChildren } from "react";
import "./Backdrop.css";
const Backdrop = ({
  children,
  onClick,
  open,
}: PropsWithChildren<{ onClick: () => void; open: boolean }>) => (
  <div onClick={onClick} className={`backdrop${open ? " open" : ""}`}>
    {children}
  </div>
);

export default Backdrop;
