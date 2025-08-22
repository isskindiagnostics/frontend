import { HTMLAttributes } from "react";

import Loader from "../Loader";

import { container, wrapper, text } from "./index.css";

type LoaderProps = HTMLAttributes<HTMLDivElement> & {};

const AnalysisLoader = ({ className }: LoaderProps) => {
  return (
    <div className={`${container} ${className}`}>
      <div className={wrapper}>
        <Loader />
        <div className={text}>
          <h1>Analisando</h1>
          <p>Por favor, aguarde enquanto analisamos a imagem para você.</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisLoader;
