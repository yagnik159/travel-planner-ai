import React from "react";
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";

export default function DatePicker({ onChangeCallback }) {
  return (
    <Flatpickr
      name="goodsreadyby"
      className="w-full p-[10px]"
      options={{
        dateFormat: "d-m-Y",
        minDate: "today",
        maxDate: new Date().fp_incr(15),
      }}
      onChange={(_, dateStr) => {
        onChangeCallback({ start_date: dateStr });
      }}
      required
    />
  );
}
