/**
 * MonthPicker.tsx
 * Month picker component for line chart
 * @author Sara Tran
 * @updated 2021-11-18
 */

import React, { useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface MonthPickerProps {
  date: Date | null;
  onClickMonth: (value: Date) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ date, onClickMonth }) => {
  // The currently selected date
  const [selectedDate, setSelectedDate] = useState(date);

  // Handles changing the selected date
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
