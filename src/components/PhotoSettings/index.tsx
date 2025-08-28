"use client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

import { useAuth } from "@/context/AuthContext";
import { storage } from "@/firebase/config";

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

const PhotoSettings = ({
  defaultImage,
  width = 94,
  className,
  onUploadComplete,
  onUploadError,
  ...props
}: PhotoSettingsProps) => {
  const { user } = useAuth();
  const [preview, setPreview] = useState<string | undefined>(defaultImage);
  const [isUploading, setIsUploading] = useState(false);

  // Update preview when defaultImage changes
  useEffect(() => {
    setPreview(defaultImage);
  }, [defaultImage]);

  const uploadImageToFirebase = async (file: File): Promise<string> => {
    try {
      const fileExtension = file.name.split(".").pop() || "jpg";
      const fileName = `users/${user?.uid}/profile/profile-picture.${fileExtension}`;

      const storageRef = ref(storage, fileName);

      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          uploadedAt: new Date().toISOString(),
          userId: user?.uid || "",
        },
      });

      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);

    try {
      const imageUrl = await uploadImageToFirebase(file);
      setPreview(imageUrl);
      onUploadComplete?.(imageUrl);
    } catch (error) {
      console.error("Failed to upload image:", error);
      onUploadError?.(error as Error);

      // Revert preview on error
      setPreview(defaultImage);
    } finally {
      setIsUploading(false);
    }
  };

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
    [user?.uid, onUploadComplete, onUploadError]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: false,
    noClick: true,
    noKeyboard: true,
    maxSize: 5 * 1024 * 1024, // 5MB limit
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
  );
};

export default PhotoSettings;
