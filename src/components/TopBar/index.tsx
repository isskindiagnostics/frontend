import Image from "next/image";
import { HTMLAttributes, PropsWithChildren } from "react";

import ProfileImg from "@/assets/images/default-profile-image.png";

import { pageTitle, profileImg, topBar } from "./index.css";

type TopBarProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    title: string;
  }
>;

const TopBar = ({ title, className, children, ...props }: TopBarProps) => {
  return (
    <div className={`${topBar} ${className}`} {...props}>
      <h1 className={pageTitle}>{title}</h1>
      {children}
      <Image
        className={profileImg}
        src={ProfileImg}
        alt="Sua foto de perfil"
        width={34}
        height={34}
      />
    </div>
  );
};

export default TopBar;
