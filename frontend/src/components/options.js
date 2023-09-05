import { useEffect, useState } from "react";

const SelectOptions = ({ onChangeCallback }) => {
  const [cuisineTypes, setCuisineTypes] = useState([]);

  const onChange = (e) => {
    if (e.target.checked) {
      setCuisineTypes([...cuisineTypes, e.target.name]);
    } else {
      setCuisineTypes(cuisineTypes.filter((item) => item !== e.target.name));
    }
  };

  useEffect(() => {
    onChangeCallback({ cuisine_types: cuisineTypes });
  }, [cuisineTypes]);

  return (
    <div className="flex flex-col gap-y-[20px]">
      <Checkbox
        label="Vegetarian"
        name="vegetarian"
        value="vegetarian"
        onChange={onChange}
      />
      <Checkbox
        label="Non-Vegetarian"
        value="non-vegetarian"
        name="non-vegetarian"
        onChange={onChange}
      />
      <Checkbox label="Vegan" value="vegan" name="vegan" onChange={onChange} />
    </div>
  );
};

const Checkbox = ({ label, onChange, name }) => {
  return (
    <label className="flex justify-between cursor-pointer">
      {label}
      <input
        type="checkbox"
        name={name}
        onChange={onChange}
        className="w-5 h-5 shrink-0 mt-0.5 cursor-pointer border-gray-600 rounded text-zinc-900 focus:text-zinc-900 focus:ring-white checked:bg-zinc-900 checked:border-zinc-900 transition-all duration-200 focus:ring-offset-zinc-900"
      />
    </label>
  );
};

export default SelectOptions;
