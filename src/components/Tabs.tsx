import MaterialTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface ITabsProps {
  activeTabIndex: number;
  onChangeActiveTab: (event: React.SyntheticEvent, newValue: number) => void;
}

export const Tabs = ({ activeTabIndex, onChangeActiveTab }: ITabsProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <MaterialTabs
        value={activeTabIndex}
        onChange={onChangeActiveTab}
        aria-label="basic tabs example"
      >
        <Tab label="Configuration" />
        <Tab label="Form" />
      </MaterialTabs>
    </Box>
  );
};
