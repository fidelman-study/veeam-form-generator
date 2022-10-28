import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { useCallback, useState } from "react";
import { IFormField } from "./index.interface";

interface IDatePickerProps extends IFormField {}

type Date = moment.Moment;

export const DatePicker = ({ name, label }: IDatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const handleChange = useCallback((newDate: Date | null) => {
    setDate(newDate);
  }, []);

  return (
    <DesktopDatePicker
      label={label}
      inputFormat="MM/DD/YYYY"
      onChange={handleChange}
      value={date}
      renderInput={(params) => <TextField {...params} name={name} />}
    />
  );
};
