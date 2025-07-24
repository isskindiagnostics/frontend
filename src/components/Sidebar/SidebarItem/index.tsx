import { ButtonHTMLAttributes, ReactElement } from "react";

import {
  btnInitial,
  btnSelected,
  button,
  text,
  textSelected,
  textInitial,
} from "./index.css";

type SidebarItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: ReactElement;
  selected?: boolean;
};

const Sidebar = ({
  label,
  icon,
  className,
  selected = false,
  ...props
}: SidebarItemProps) => {
  return (
    <button
      className={`${button} ${
        selected ? btnSelected : btnInitial
      } ${className}`}
      {...props}
    >
      {icon}
      <p
        className={`${text} ${
          selected ? textSelected : textInitial
        } ${className}`}
      >
        {label}
      </p>
    </button>
  );
};

export default Sidebar;
