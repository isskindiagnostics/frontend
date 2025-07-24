import {
  container,
  button,
  text,
  isSelectText,
  isSelectBtn,
} from "./index.css";

export type TabItemProps = {
  tabs: {
    label: string;
    selected: boolean;
    onSelect: () => void;
  }[];
  className?: string;
};

const TabItem = ({ className, tabs }: TabItemProps) => {
  return (
    <div className={container}>
      {tabs.map((tab, idx) => {
        return (
          <button
            key={idx}
            className={`${button} ${tab.selected && isSelectBtn} ${className}`}
            onClick={tab.onSelect}
          >
            <p className={`${text} ${tab.selected && isSelectText}`}>
              {tab.label}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default TabItem;
