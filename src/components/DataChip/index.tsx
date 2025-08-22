import * as Icon from "isskinui/icons";
import { HTMLAttributes } from "react";

import * as style from "./index.css";

type DataChipProps = HTMLAttributes<HTMLDivElement> & {
  icon: keyof typeof Icon;
  label: string;
  value?: string | number;
};

const DataChip = ({ icon, label, value, ...rest }: DataChipProps) => {
  const IconComponent = Icon[icon];

  return (
    <div className={style.container} {...rest}>
      <div className={style.iconWrapper}>
        <IconComponent />
      </div>
      <div>
        <p className={style.label}>{label}</p>
        <p className={style.value}>{value}</p>
      </div>
    </div>
  );
};

export default DataChip;
