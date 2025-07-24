import { CSSProperties, HTMLAttributes, PropsWithChildren } from "react";

import { container } from "./index.css";

type ContentBlockProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  flexDirection?: CSSProperties["flexDirection"];
};

const ContentBlock = ({
  flexDirection = "column",
  className,
  children,
}: ContentBlockProps) => {
  return (
    <div className={`${container} ${className}`} style={{ flexDirection }}>
      {children}
    </div>
  );
};

export default ContentBlock;
