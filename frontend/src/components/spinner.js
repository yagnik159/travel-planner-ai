import React, { useEffect, useState } from "react";
import NumericInput from "react-numeric-input";

export default function Spinner({ onChangeCallback }) {
  const [travelDuration, setTravelDuration] = useState(1);

  useEffect(() => {
    onChangeCallback({ days: travelDuration });
  }, [travelDuration]);

  return (
    <NumericInput
      className="form-control font-bold"
      value={travelDuration}
      min={1}
      max={50}
      step={1}
      precision={0}
      size={5}
      mobile
      onChange={(val) => {
        setTravelDuration(val || 1);
      }}
    />
  );
}
