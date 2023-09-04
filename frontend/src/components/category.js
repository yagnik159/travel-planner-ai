import CoupleSvg from "@/svg/couple";
import FamilySvg from "@/svg/family";
import FriendsSvg from "@/svg/friends";
import Solo from "@/svg/solo";
import React from "react";
import { RadioButton, RadioGroup } from "react-radio-buttons";

export default function Category() {
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <RadioGroup horizontal onChange={onChange}>
      <RadioButton
        value="solo"
        pointColor={"purple"}
        iconSize={20}
        iconInnerSize={10}
      >
        <Solo />
        <div className="mt-4 text-base text-black font-semibold text-left">
          Solo
        </div>
      </RadioButton>
      <RadioButton
        value="couple"
        pointColor={"purple"}
        iconSize={20}
        iconInnerSize={10}
      >
        <CoupleSvg />
        <div className="mt-4 text-base text-black font-semibold text-left">
          Couple
        </div>
      </RadioButton>
      <RadioButton
        value="family"
        pointColor={"purple"}
        iconSize={20}
        iconInnerSize={10}
        className="red"
      >
        <FamilySvg />
        <div className="mt-4 text-base text-black font-semibold text-left">
          Family
        </div>
      </RadioButton>
      <RadioButton
        value="friends"
        pointColor={"purple"}
        iconSize={20}
        iconInnerSize={10}
        className="red"
      >
        <FriendsSvg />
        <div className="mt-4 text-base text-black font-semibold text-left">
          Friends
        </div>
      </RadioButton>
    </RadioGroup>
  );
}
