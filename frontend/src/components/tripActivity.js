import React from "react";

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
    <div>
      <div>{location_name}</div>
      <div>{activity_description}</div>
      <div>Start at : {local_time}</div>
      <div>Duration: {duration_min}</div>
      <div>Activity Type: {activity_types.join(", ")}</div>
      {budget_inr > 0 ? <div>{budget_inr}</div> : null}
    </div>
  );
}

export default TripActivity;
