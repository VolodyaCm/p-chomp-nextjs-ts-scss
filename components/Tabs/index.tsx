import { useState } from 'react';
import Button from '@components/Button';
import styles from './Tabs.module.scss';

interface TabType {
  title: string;
  selected: boolean;
  idx: number;
}

interface TabProps {
  tabs: string[];
}

const Tabs = ({ tabs = [] }: TabProps) => {
  const [tabsObj, setTabs] = useState(
    tabs.map((t, i) => ({ title: t, selected: i === 0, idx: i }))
  );

  const click = (tab: TabType) => () => {
    setTabs(tabsObj.map((t, i) => ({ ...t, selected: i === tab.idx })));
  };

  return (
    <div className={styles.tabs}>
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
