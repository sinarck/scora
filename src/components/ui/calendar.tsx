import {
  Calendar as FlashCalendar,
  toDateId,
} from "@marceloterreiro/flash-calendar";
import { useState } from "react";

const today = toDateId(new Date());

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <FlashCalendar
      calendarActiveDateRanges={[
        {
          startId: selectedDate,
          endId: selectedDate,
        },
      ]}
      calendarMonthId={today}
      onCalendarDayPress={setSelectedDate}
    />
  );
}
