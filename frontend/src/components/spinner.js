import React from "react";
import NumericInput from "react-numeric-input";

export default function Spinner() {
  return (
    <NumericInput
      className="form-control font-bold"
      value="1"
      min={1}
      max={7}
      step={1}
      precision={0}
      size={5}
      mobile
      //   readOnly
      //   inputMode="numeric"
    />
  );
}
