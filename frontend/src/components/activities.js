import BeachesSvg from "@/svg/beaches";
import CitySvg from "@/svg/citySeeing";
import FestivalSvg from "@/svg/festival";
import HikingSvg from "@/svg/hiking";
import NightLifeSvg from "@/svg/nightLife";
import RestaurantSvg from "@/svg/restaurant";
import ShoppingSvg from "@/svg/shopping";
import SpaSvg from "@/svg/spa";
import React, { useState } from "react";

export default function Activities() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
    console.log("=========target.valu==========", e.target.value);
  };

  return (
    <div className="grid gird-cols-3 gap-[30px]">
      <div className="border">
        <div className="relative p-[20px] w-full h-full text-left">
          <BeachesSvg />
          <input
            name="beaches"
            type="checkbox"
            value="beaches"
            onChange={onChange}
            className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0"
          />
          <div className="mt-2 text-sm sm:text-base font-medium">Beaches</div>
        </div>
      </div>
      <div className="border">
        <div className="relative p-[20px] w-full h-full text-left">
          <CitySvg />
          <input
            name="city"
            type="checkbox"
            value="city"
            onChange={onChange}
            className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0"
          />
          <div className="mt-2 text-sm sm:text-base font-medium">
            City sightseeing
          </div>
        </div>
      </div>
      <div className="border">
        <div className="relative p-[20px] w-full h-full text-left">
          <HikingSvg />
          <input
            name="outdoor"
            type="checkbox"
            value="outdoor"
            onChange={onChange}
            className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0"
          />
          <div className="mt-2 text-sm sm:text-base font-medium">
            Outdoor adventures
          </div>
        </div>
      </div>
      <div className="border">
        <div className="relative p-[20px] w-full h-full text-left">
          <FestivalSvg />
          <input
            name="events"
            type="checkbox"
            value="events"
            onChange={onChange}
            className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0"
          />
          <div className="mt-2 text-sm sm:text-base font-medium">
            Festivals/events
          </div>
        </div>
      </div>
      <div className="border">
        <div className="relative p-[20px] w-full h-full text-left">
          <RestaurantSvg />
          <input
            name="food"
            type="checkbox"
            value="food"
            onChange={onChange}
            className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0"
          />
          <div className="mt-2 text-sm sm:text-base font-medium">
            Food exploration
          </div>
        </div>
      </div>
      <div className="border">
        <div className="relative p-[20px] w-full h-full text-left">
          <NightLifeSvg />
          <input
            name="nightLife"
            type="checkbox"
            value="nightLife"
            onChange={onChange}
            className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0"
          />
          <div className="mt-2 text-sm sm:text-base font-medium">Nightlife</div>
        </div>
      </div>
      <div className="border">
        <div className="relative p-[20px] w-full h-full text-left">
          <ShoppingSvg />
          <input
            name="shopping"
            type="checkbox"
            value="shopping"
            onChange={onChange}
            className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0"
          />
          <div className="mt-2 text-sm sm:text-base font-medium">Shopping</div>
        </div>
      </div>
      <div className="border">
        <div className="relative p-[20px] w-full h-full text-left">
          <SpaSvg />
          <input
            name="spa"
            type="checkbox"
            value="spa"
            onChange={onChange}
            className="absolute w-full h-full left-0 right-0 top-0 bottom-0 opacity-0"
          />
          <div className="mt-2 text-sm sm:text-base font-medium">
            Spa wellness
          </div>
        </div>
      </div>
    </div>
  );
}
