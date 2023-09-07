import React from "react";
import TripActivity from "./tripActivity";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import HotelRecommendations from "./hotelRecommendations";
import ArrowSvg from "@/svg/arrow";
import CityDetailsCard from "@/components/cityDetailsCard";
import Loader from "./loader";

function TripPlan({ tripPlanRes, loader }) {
  if (loader) {
    return <Loader />;
  }

  return (
    <Accordion
      transition
      transitionTimeout={500}
      className="flex flex-col gap-[30px] w-[800px]"
    >
      {tripPlanRes.days.map((day, i) => (
        <AccordionItem
          key={i}
          header={
            <div className="text-left">
              <div className="flex items-center">
                <ArrowSvg />
                <p className="font-bold text-[1.5rem] text-[#1f2937]">
                  {day.title}
                </p>
              </div>
              <p className="mb-4 text-sm ml-[36px] font-semibold text-[#3d3933] mt-[10px]">
                {day.day_summary}
              </p>
            </div>
          }
        >
          <div className="flex flex-col" key={i}>
            <ol className="relative sm:border-l sm:border-gray-200 sm:ms-1 mt-6 flex flex-col gap-[20px]">
              {day.activities.map((activity, i) => (
                <TripActivity activity={activity} />
              ))}
            </ol>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default TripPlan;
