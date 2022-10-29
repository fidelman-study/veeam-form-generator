import MaterialTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { configurationStatusMap, IConfigurationStatus } from "./TabStatusIcons";
import styled from "@emotion/styled";
import { useMemo } from "react";

interface ITabsProps {
  activeTabIndex: number;
  onChangeActiveTab: (event: React.SyntheticEvent, newValue: number) => void;
  configurationStatusInfo?: { status: IConfigurationStatus; message: string };
}

const StyledTab = styled(Tab)`
  min-height: 48px;
`;

function getIcon(
  configurationStatusInfo: ITabsProps["configurationStatusInfo"],
) {
  if (!configurationStatusInfo) {
    return undefined;
  }

  const Icon = configurationStatusMap[configurationStatusInfo.status];
  return <Icon title={configurationStatusInfo.message} />;
}

export const Tabs = ({
  activeTabIndex,
  onChangeActiveTab,
  configurationStatusInfo,
}: ITabsProps) => {
  const icon = useMemo(
    () => getIcon(configurationStatusInfo),
    [configurationStatusInfo],
  );

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <MaterialTabs
        value={activeTabIndex}
        onChange={onChangeActiveTab}
        aria-label="basic tabs example"
      >
        <StyledTab icon={icon} iconPosition="end" label="Configuration" />
        <StyledTab label="Form" />
      </MaterialTabs>
    </Box>
  );
};
