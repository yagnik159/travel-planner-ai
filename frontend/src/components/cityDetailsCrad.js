import React, { useEffect, useState } from "react";
import Loader from "./loader";
import axios from "axios";

function CityDetailsCrad({ destination = "" }) {
  const [loading, setLoading] = useState(true);

  const [cityDetails, setCityDetails] = useState(null);

  const getCityDetails = async (destination) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/city-details?destination=${destination}`
      );

      setCityDetails(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCityDetails(destination);
  }, [destination]);

  if (loading) return <Loader loaderText="" />;

  console.log({ cityDetails });
  return (
    <div>
      <div>{destination}</div>
      <img src={cityDetails.imageUrl} alt={destination} />
      <div>{cityDetails.description}</div>
    </div>
  );
}

export default CityDetailsCrad;
