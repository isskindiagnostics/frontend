import { headingWrapper, lastUpdate } from "../index.css";

interface TermsHeaderProps {
  title: string;
  lastUpdated: string;
}

export default function TermsHeader({ title, lastUpdated }: TermsHeaderProps) {
  return (
    <div className={headingWrapper}>
      <h1>{title}</h1>
      <p className={lastUpdate}>Última atualização: {lastUpdated}</p>
    </div>
  );
}
