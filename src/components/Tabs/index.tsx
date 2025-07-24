import { HTMLAttributes } from "react";

import { container } from "./index.css";
import TabItem, { TabItemProps } from "./TabItem";

type TabskProps = HTMLAttributes<HTMLDivElement> & TabItemProps & {};

const Tabs = ({ className, tabs, ...props }: TabskProps) => {
  return (
    <div className={`${container} ${className}`} {...props}>
      <TabItem tabs={tabs} />
    </div>
  );
};

export default Tabs;
