"use client";

import { Edit } from "isskinui";
import Image from "next/image";
import {
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";

import ProfileImg from "../../assets/images/default-profile-image.png";

import {
  container,
  icon,
  profileImage,
  inputHidden,
  editOverlay,
} from "./index.css";

type PhotoSettingsProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  defaultImage?: string;
  width?: CSSProperties["width"];
  onImageSelect?: (src: string) => void;
};

const PhotoProfile = ({
  defaultImage,
  width = 94,
  className,
  onImageSelect,
  ...props
}: PhotoSettingsProps) => {
  const [preview, setPreview] = useState<string | undefined>(defaultImage);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        onImageSelect?.(url);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div
      {...getRootProps()}
      className={`${container} ${className}`}
      style={{ width, height: width }}
      {...props}
    >
      <Image
        src={preview || ProfileImg}
        alt="Sua foto de perfil"
        fill
        className={profileImage}
      />
      <div className={editOverlay} onClick={open}>
        <Edit className={icon} />
      </div>
      <input {...getInputProps()} className={inputHidden} />
    </div>
  );
};

export default PhotoProfile;
