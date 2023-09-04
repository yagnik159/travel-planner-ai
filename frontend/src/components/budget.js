import React from "react";
import { RadioButton, RadioGroup } from "react-radio-buttons";
import CurrencySvg from "@/svg/currency";

export default function Budget() {
  const onChange = (value) => {
    console.log(value);
  };

  return (
    <RadioGroup horizontal onChange={onChange}>
      <RadioButton
        value="0-500"
        pointColor={"purple"}
        iconSize={20}
        iconInnerSize={10}
      >
        <CurrencySvg />
        <div className="mt-4 text-base text-black font-semibold text-left">
          Low
        </div>
        <div className="text-sm text-gray-500 text-left">0 - 500 USD</div>
      </RadioButton>
      <RadioButton
        value="500-2500"
        pointColor={"purple"}
        iconSize={20}
        iconInnerSize={10}
      >
        <CurrencySvg />
        <div className="mt-4 text-base text-black font-semibold text-left">
          Medium
        </div>
        <div className="text-sm text-gray-500 text-left">500 - 2500 USD</div>
      </RadioButton>
      <RadioButton
        value="2500>"
        pointColor={"purple"}
        iconSize={20}
        iconInnerSize={10}
        className="red"
      >
        <CurrencySvg />
        <div className="mt-4 text-base text-black font-semibold text-left">
          High
        </div>
        <div className="text-sm text-gray-500 text-left">2500+ USD</div>
      </RadioButton>
    </RadioGroup>
  );
}
