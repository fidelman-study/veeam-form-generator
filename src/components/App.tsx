import Box from "@mui/material/Box";
import { TabContent } from "./TabContent";
import { useTabManager } from "../hooks/use-tab-manager";
import { Tabs } from "./Tabs";
import { FormConfigurator } from "./FormConfigurator";
import { DatePicker } from "./FormFields/DatePicker";

export default function App() {
  const { activeTabIndex, handleChangeActiveTab } = useTabManager();

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        activeTabIndex={activeTabIndex}
        onChangeActiveTab={handleChangeActiveTab}
      />
      <TabContent value={activeTabIndex} index={0}>
        <DatePicker name="datepicker" label="hi" />
      </TabContent>
      <TabContent value={activeTabIndex} index={1}>
        Form
      </TabContent>
    </Box>
  );
}
