import React from "react";
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";

export default function DatePicker() {
  return (
    <Flatpickr
      name="goodsreadyby"
      className="w-full p-[10px]"
      options={{
        dateFormat: "d-m-Y",
        minDate: "today",
        maxDate: new Date().fp_incr(15),
      }}
      onChange={(selectedDates, dateStr, instance) => {
        const firstDate = selectedDates[0];
        // console.log(firstDate, dateStr);
      }}
    />
  );
}
