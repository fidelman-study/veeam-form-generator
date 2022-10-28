import Box from "@mui/material/Box";

interface ITabContentProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabContent(props: ITabContentProps) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
