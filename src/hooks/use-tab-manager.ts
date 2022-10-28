import { useCallback, useState } from "react";

export const useTabManager = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleChangeActiveTab = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setActiveTabIndex(newValue);
    },
    [setActiveTabIndex],
  );
  return {
    activeTabIndex,
    handleChangeActiveTab,
  };
};
