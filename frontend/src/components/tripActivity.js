import React from "react";
import ActivitySvg from "@/svg/activity";
import DurationSvg from "@/svg/duration";
import RupeeSvg from "@/svg/rupee";
import StartAtSvg from "@/svg/startAt";

function TripActivity({ activity }) {
  const {
    location_name = "",
    duration_min,
    budget_inr = 0,
    activity_types = [],
    activity_description = "",
    local_time = "",
  } = activity;
  return (
    <li className="sm:ms-6 p-4 rounded-md group border border-gray-200">
      <div className="hidden sm:block sm:absolute w-3 h-3 bg-gray-200 rounded-full mt-3 -left-1.5 border border-whites"></div>
      <div className="font-semibold text-[22px]">{location_name}</div>
      <div className="mb-4 font-base text-sm md:text-base svelte-1hpiyon">
        {activity_description}
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[8px] capitalize">
          {" "}
          <StartAtSvg /> {local_time}
        </div>
        <div className="flex items-center gap-[8px] capitalize">
          <DurationSvg /> {duration_min} minutes
        </div>
        <div className="flex items-center gap-[8px] capitalize">
          <ActivitySvg /> {activity_types.join(", ")}
        </div>
        {budget_inr > 0 ? (
          <div className="flex items-center gap-[8px] capitalize">
            <RupeeSvg />
            {budget_inr}
          </div>
        ) : null}
      </div>
    </li>
  );
}

export default TripActivity;
