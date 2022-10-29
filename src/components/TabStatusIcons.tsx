import Tooltip from "@mui/material/Tooltip";
import MaterialInfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import styled from "@emotion/styled";

interface IIconProps {
  title: string;
}

export type IConfigurationStatus = "success" | "error" | "info";

interface IIconConfiguration {
  type: IConfigurationStatus;
  icon: typeof MaterialInfoIcon;
}

const iconConfigurations: IIconConfiguration[] = [
  { type: "success", icon: CheckCircleIcon },
  { type: "error", icon: WarningIcon },
  { type: "info", icon: MaterialInfoIcon },
];

type IIconfigurationStatusMap = Record<
  IConfigurationStatus,
  (props: IIconProps) => JSX.Element
>;

const IconWrapper = styled.div`
  margin-left: 10px;
`;

const getIconComponent =
  (iconConfiguration: IIconConfiguration) =>
  ({ title }: IIconProps) =>
    (
      <Tooltip title={title}>
        <IconWrapper>
          <iconConfiguration.icon color={iconConfiguration.type} />
        </IconWrapper>
      </Tooltip>
    );

export const configurationStatusMap = iconConfigurations.reduce(
  (acc, iconConfiguration) => {
    acc[iconConfiguration.type] = getIconComponent(iconConfiguration);
    return acc;
  },
  {} as IIconfigurationStatusMap,
);
