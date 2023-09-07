import React, { useEffect, useState } from "react";
import Loader from "./loader";
import axios from "axios";

function HotelRecommendations(props) {
  const {
    destination = "goa, india",
    start_date = "20-10-2023",
    days = 3,
    group_type = "solo",
  } = props;

  const [hotelRecommendations, setHotelRecommendations] = useState(null);

  const [loading, setLoading] = useState(true);

  const getHotelRecommendations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/hotels?location=${destination}&start_date=${start_date}&days=${days}&group_type=${group_type}`
      );

      setHotelRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHotelRecommendations();
  }, []);

  if (loading) return <Loader loaderText="" />;

  if (hotelRecommendations) {
    return (
      <>
        <div>HotelRecommendations</div>
        <div>
          {hotelRecommendations.hotel_id.map((hotelId) => {
            const hotelMapById = hotelRecommendations.hotel_map_by_id || {};

            const {
              id = "",
              name = "",
              url = "",
              image_url = "",
              address = "",
              price = "",
            } = hotelMapById[hotelId] || {};

            return (
              <div key={id}>
                <a href={url}>{name}</a>
                <div>Address: {address}</div>
                <div>Costs: Approximately {price}</div>
                <div>
                  <img src={image_url} alt={name} />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <div>HotelRecommendations</div>
      <div>No hotels found.</div>
    </>
  );
}

export default HotelRecommendations;
