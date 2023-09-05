import BeachesSvg from "@/svg/beaches";
import CitySvg from "@/svg/citySeeing";
import FestivalSvg from "@/svg/festival";
import HikingSvg from "@/svg/hiking";
import NightLifeSvg from "@/svg/nightLife";
import RestaurantSvg from "@/svg/restaurant";
import ShoppingSvg from "@/svg/shopping";
import SpaSvg from "@/svg/spa";
import { useEffect, useState } from "react";

export default function Activities({ onChangeCallback }) {
  const [activities, setActivities] = useState([]);

  const onChange = (e) => {
    if (e.target.checked) {
      setActivities([...activities, e.target.value]);
    } else {
      setActivities(activities.filter((item) => item !== e.target.value));
    }
  };

  useEffect(() => {
    onChangeCallback({ interests: activities });
  }, [activities]);

  return (
    <div className="grid gird-cols-3 gap-[30px]">
      <div className="relative p-[20px] w-full h-full text-left">
        <BeachesSvg />
        <input
          name="beaches"
          type="checkbox"
          value="beaches"
          onChange={onChange}
          className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
        />
        <label className="mt-[10px] block text-sm sm:text-base font-medium fullContainer">
          Beaches
        </label>
      </div>
      <div className="relative p-[20px] w-full h-full text-left">
        <CitySvg />
        <input
          name="city"
          type="checkbox"
          value="city"
          onChange={onChange}
          className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
        />
        <label className="mt-[10px] block text-sm sm:text-base font-medium fullContainer">
          City sightseeing
        </label>
      </div>
      <div className="relative p-[20px] w-full h-full text-left">
        <HikingSvg />
        <input
          name="outdoor"
          type="checkbox"
          value="outdoor"
          onChange={onChange}
          className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
        />
        <label className="mt-[10px] block text-sm sm:text-base font-medium fullContainer">
          Outdoor adventures
        </label>
      </div>

      <div className="relative p-[20px] w-full h-full text-left">
        <FestivalSvg />
        <input
          name="events"
          type="checkbox"
          value="events"
          onChange={onChange}
          className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
        />
        <label className="mt-[10px] block text-sm sm:text-base font-medium fullContainer">
          Festivals/events
        </label>
      </div>

      <div className="relative p-[20px] w-full h-full text-left">
        <RestaurantSvg />
        <input
          name="food"
          type="checkbox"
          value="food"
          onChange={onChange}
          className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
        />
        <label className="mt-[10px] block text-sm sm:text-base font-medium fullContainer">
          Food exploration
        </label>
      </div>

      <div className="relative p-[20px] w-full h-full text-left">
        <NightLifeSvg />
        <input
          name="nightLife"
          type="checkbox"
          value="nightLife"
          onChange={onChange}
          className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
        />
        <label className="mt-[10px] block text-sm sm:text-base font-medium fullContainer">
          Nightlife
        </label>
      </div>

      <div className="relative p-[20px] w-full h-full text-left">
        <ShoppingSvg />
        <input
          name="shopping"
          type="checkbox"
          value="shopping"
          onChange={onChange}
          className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
        />
        <label className="mt-[10px] block text-sm sm:text-base font-medium fullContainer">
          Shopping
        </label>
      </div>

      <div className="relative p-[20px] w-full h-full text-left">
        <SpaSvg />
        <input
          name="spa"
          type="checkbox"
          value="spa"
          onChange={onChange}
          className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
        />
        <label className="mt-[10px] block text-sm sm:text-base font-medium fullContainer">
          Spa wellness
        </label>
      </div>
    </div>
  );
}
