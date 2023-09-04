import React from "react";

const SelectOptions = () => {
  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  return (
    <div className="flex flex-col gap-y-[20px]">
      <Checkbox
        label="Vegetarian"
        value={checkedOne}
        onChange={handleChangeOne}
      />
      <Checkbox
        label="Non-Vegetarian"
        value={checkedTwo}
        onChange={handleChangeTwo}
      />
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label className="flex justify-between cursor-pointer">
      {label}
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="w-5 h-5 shrink-0 mt-0.5 cursor-pointer border-gray-600 rounded text-zinc-900 focus:text-zinc-900 focus:ring-white checked:bg-zinc-900 checked:border-zinc-900 transition-all duration-200 focus:ring-offset-zinc-900"
      />
    </label>
  );
};

export default SelectOptions;
