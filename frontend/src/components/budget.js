import React from "react";
import { RadioButton, RadioGroup } from "react-radio-buttons";
import CurrencySvg from "@/svg/currency";

export default function Budget({ onChangeCallback }) {
  return (
    <RadioGroup
      horizontal
      onChange={(value) => onChangeCallback({ budget: value })}
    >
      <RadioButton
        value="0-10000"
        pointColor={"purple"}
        iconSize={20}
        iconInnerSize={10}
      >
        <CurrencySvg />
        <div className="mt-4 text-base text-black font-semibold text-left">
          Low
        </div>
        <div className="text-sm text-gray-500 text-left">0 - 10000 INR</div>
      </RadioButton>
      <RadioButton
        value="10000-25000"
        pointColor={"purple"}
        iconSize={20}
        iconInnerSize={10}
      >
        <CurrencySvg />
        <div className="mt-4 text-base text-black font-semibold text-left">
          Medium
        </div>
        <div className="text-sm text-gray-500 text-left">10000 - 25000 INR</div>
      </RadioButton>
      <RadioButton
        value="25000+"
        pointColor={"purple"}
        iconSize={20}
        iconInnerSize={10}
        className="red"
      >
        <CurrencySvg />
        <div className="mt-4 text-base text-black font-semibold text-left">
          High
        </div>
        <div className="text-sm text-gray-500 text-left">25000+ INR</div>
      </RadioButton>
    </RadioGroup>
  );
}
