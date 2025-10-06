"use client";
import Image from "next/image";
import { HTMLAttributes, PropsWithChildren } from "react";

import ProfileImg from "@/assets/images/default-profile-image.png";
import { useUserData } from "@/hooks/useUserData";

import SkeletonCell from "../SkeletonCell";

import { imageContainer, pageTitle, profileImg, topBar } from "./index.css";

type TopBarProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    title: string;
  }
>;

const TopBar = ({ title, className, children, ...props }: TopBarProps) => {
  const { userData, isLoading } = useUserData();

  return (
    <div className={`${topBar} ${className}`} {...props}>
      <h1 className={pageTitle}>{title}</h1>
      {children}

      {isLoading ? (
        <SkeletonCell width={34} height={34} style={{ borderRadius: "50%" }} />
      ) : (
        <div className={imageContainer}>
          <Image
            className={profileImg}
            src={userData?.userData.profilePicture || ProfileImg}
            alt="Sua foto de perfil"
            fill
          />
        </div>
      )}
    </div>
  );
};

export default TopBar;
