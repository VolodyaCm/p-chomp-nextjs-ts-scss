import { useState, DetailedHTMLProps, HTMLAttributes } from 'react';
import Button from '@components/Button';
import styles from './Tabs.module.scss';

export interface TabType {
  title: string;
  selected: boolean;
  idx: number;
}
interface TabProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLHeadingElement
  > {
  tabs: string[];
  onChangeTab?: (tab: TabType) => void;
}

const Tabs = ({ tabs = [], className, onChangeTab, ...props }: TabProps) => {
  const [tabsObj, setTabs] = useState(
    tabs.map((t, i) => ({ title: t, selected: i === 0, idx: i }))
  );

  const click = (tab: TabType) => () => {
    if (onChangeTab) onChangeTab(tab);
    setTabs(tabsObj.map((t, i) => ({ ...t, selected: i === tab.idx })));
  };

  return (
    <div className={`${styles.tabs} ${className}`} {...props}>
      {tabsObj.map((tab: TabType) => (
        <Button
          outline={!tab.selected}
          filled={tab.selected}
          primary={tab.selected}
          key={tab.title}
          onClick={click(tab)}
        >
          {tab.title}
        </Button>
      ))}
    </div>
  );
};

export default Tabs;
