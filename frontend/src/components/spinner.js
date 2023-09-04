import React, { useState } from "react";
import NumericInput from "react-numeric-input";

export default function Spinner({ onChangeCallback }) {
  const [travelers, setTravelers] = useState(1);

  return (
    <NumericInput
      className="form-control font-bold"
      value={travelers}
      min={1}
      max={50}
      step={1}
      precision={0}
      size={5}
      mobile
      onChange={(val) => {
        setTravelers(val || 1);
        onChangeCallback({ travelers: val });
      }}
    />
  );
}
