import React from "react";
import TripActivity from "./tripActivity";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";

function TripPlan({ tripPlanRes }) {
  return (
    <div className="flex-1 container w-full mx-auto sm:flex sm:items-center sm:justify-between px-[1.5rem] flex-col">
      <Accordion
        transition
        transitionTimeout={300}
        className="flex flex-col gap-[30px] w-[800px]"
      >
        {tripPlanRes.days.map((day, i) => (
          <AccordionItem header={day.title} key={i}>
            <div className="flex flex-col" key={i}>
              {/* <h1 className="font-bold text-[1.5rem]">{day.title}</h1> */}
              <div className="mb-4 font-base text-sm md:text-base">
                {day.day_summary}
              </div>

              <div>
                {day.activities.map((activity, i) => (
                  <TripActivity activity={activity} />
                ))}
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default TripPlan;
