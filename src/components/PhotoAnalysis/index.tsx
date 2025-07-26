"use client";

import { Button, FileImage, Link } from "isskinui";
import Image from "next/image";
import {
  useState,
  useCallback,
  useEffect,
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import { useDropzone } from "react-dropzone";

import {
  container,
  icon,
  contentWrapper,
  progressBarWrapper,
  progressBar,
  progressFill,
  imageRestrictions,
  hiddenInput,
  selectedImage,
  reuploadButton,
} from "./index.css";

type PhotoAnalysisProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  defaultImage?: string;
  width?: CSSProperties["width"];
  onImageSelect?: (src: string) => void;
};

const PhotoAnalysis = ({
  defaultImage,
  width = "254px",
  onImageSelect,
  ...props
}: PhotoAnalysisProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(
    defaultImage || null
  );

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreviewSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setImageFile(file);
        onImageSelect?.(URL.createObjectURL(file));

        setUploadProgress(0);
        setUploadStarted(true);
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setUploadStarted(false);
              return 100;
            }
            return prev + 10;
          });
        }, 100);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/heic": [],
    },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  const handleChooseAnother = () => {
    open();
  };

  const handleButtonClick = () => {
    open();
  };

  return (
    <div {...props} style={{ width, textAlign: "center" }}>
      <div
        {...getRootProps()}
        className={container}
        style={{ position: "relative" }}
      >
        {previewSrc && uploadProgress === 100 && !uploadStarted ? (
          <Image
            src={previewSrc}
            alt="Selected Image"
            className={selectedImage}
            unoptimized
          />
        ) : (
          <>
            <FileImage className={icon} />
            <div className={contentWrapper}>
              Arraste e solte a sua foto aqui ou{" "}
              <Link
                renderAs="button"
                onClick={handleButtonClick}
                variant="strong"
              >
                escolha uma foto
              </Link>
            </div>
            {uploadStarted && (
              <div className={progressBarWrapper}>
                <div className={progressBar}>
                  <div
                    className={progressFill}
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </>
        )}

        <input {...getInputProps()} className={hiddenInput} />
      </div>

      {previewSrc && uploadProgress === 100 && !uploadStarted && (
        <Button
          variant="outlined"
          onClick={handleChooseAnother}
          className={reuploadButton}
        >
          Escolher outra foto
        </Button>
      )}

      {!previewSrc && !uploadStarted && (
        <p className={imageRestrictions}>Máx 5MB | PNG, JPG, JPEG, HEIC</p>
      )}
    </div>
  );
};

export default PhotoAnalysis;
