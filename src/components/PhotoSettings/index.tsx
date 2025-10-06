"use client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Edit, Notification } from "isskinui";
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

import { useAuth } from "@/context/AuthContext";
import { storage } from "@/firebase/config";
import { useShowToast } from "@/hooks/useShowToast";

import ProfileImg from "../../assets/images/default-profile-image.png";
import SkeletonCell from "../SkeletonCell";

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
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
};

const ERROR_MESSAGES: Record<string, string> = {
  "file-too-large": "Arquivo muito grande. Tamanho máximo: 5MB",
  "file-too-small": "Arquivo muito pequeno",
  "too-many-files": "Muitos arquivos. Envie apenas um arquivo",
  "file-invalid-type": "Tipo de arquivo inválido. Use apenas JPG, PNG ou WEBP",
};

const getErrorMessage = (code: string): string => {
  return ERROR_MESSAGES[code] || "Erro ao fazer upload do arquivo";
};

const PhotoSettings = ({
  defaultImage,
  width = 94,
  className,
  onUploadComplete,
  ...props
}: PhotoSettingsProps) => {
  const { user } = useAuth();
  const [preview, setPreview] = useState<string | undefined>(defaultImage);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useShowToast();

  // Update preview when defaultImage changes
  useEffect(() => {
    setPreview(defaultImage);
  }, [defaultImage]);

  const uploadImageToFirebase = useCallback(
    async (file: File): Promise<string> => {
      if (!user?.uid) {
        setError("Usuário não autenticado");
        throw new Error("Usuário não autenticado");
      }

      try {
        const fileExtension = file.name.split(".").pop() || "jpg";
        const fileName = `users/${user.uid}/profile/profile-picture.${fileExtension}`;

        const storageRef = ref(storage, fileName);

        const snapshot = await uploadBytes(storageRef, file, {
          contentType: file.type,
          customMetadata: {
            uploadedAt: new Date().toISOString(),
            userId: user.uid,
          },
        });

        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
      } catch (error) {
        console.log("Error uploading image:", error);
        throw error;
      }
    },
    [setError, user?.uid]
  );

  const handleImageUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);

      try {
        const imageUrl = await uploadImageToFirebase(file);
        setPreview(imageUrl);
        onUploadComplete?.(imageUrl);
      } catch (error) {
        console.log(error);
        setError("Erro ao fazer upload da imagem");

        // Revert preview on error
        setPreview(defaultImage);
      } finally {
        setIsUploading(false);
      }
    },
    [uploadImageToFirebase, defaultImage, onUploadComplete, setError]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // Create temporary preview
        const tempUrl = URL.createObjectURL(file);
        setPreview(tempUrl);

        // Upload to Firebase
        handleImageUpload(file);

        // Clean up temp URL after a short delay
        setTimeout(() => {
          URL.revokeObjectURL(tempUrl);
        }, 1000);
      }
    },
    [handleImageUpload]
  );

  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg", ".JPG", ".JPEG"],
      "image/png": [".png", ".PNG"],
      "image/webp": [".webp", ".WEBP"],
    },
    multiple: false,
    noClick: true,
    noKeyboard: true,
    maxSize: 5 * 1024 * 1024, // 5MB limit
  });

  // Lidar com rejeições de arquivo
  useEffect(() => {
    if (fileRejections.length > 0) {
      const firstRejection = fileRejections[0];
      const firstError = firstRejection.errors[0];

      const errorMessage = getErrorMessage(firstError.code);
      setError(errorMessage);

      console.log("Files rejected:", fileRejections);
      fileRejections.forEach(({ file, errors }) => {
        console.log(`File ${file.name} rejected:`, errors);
      });
    }
  }, [fileRejections, setError]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
      {error && <Notification type="error" label={error} />}
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

        {isUploading && (
          <SkeletonCell
            width={94}
            height={94}
            style={{ borderRadius: "50%" }}
          />
        )}
        <input
          {...getInputProps()}
          className={inputHidden}
          disabled={isUploading}
        />
      </div>
    </>
  );
};

export default PhotoSettings;
