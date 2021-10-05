import React, { useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

// import Calendar from "react-calendar";

interface MonthPickerProps {
  date: Date | null;
  onClickMonth: (value: Date) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ date, onClickMonth }) => {
  const [selectedDate, setSelectedDate] = useState(date);

  const handleDateChange = (value: MaterialUiPickersDate) => {
    if (value) {
      setSelectedDate(value);
      onClickMonth(value);
    }
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          openTo="month"
          views={["year", "month"]}
          value={selectedDate}
          onChange={handleDateChange}
          onMonthChange={handleDateChange}
          allowKeyboardControl={false}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default MonthPicker;
