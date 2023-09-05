import React from "react";
import TripActivity from "./tripActivity";

function TripPlan({ tripPlanRes }) {
  return (
    <div className="flex-1">
      {tripPlanRes.days.map((day) => (
        <div>
          <h1>{day.title}</h1>
          <div>{day.day_summary}</div>
          <div>
            {day.activities.map((activity) => (
              <TripActivity activity={activity} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TripPlan;
