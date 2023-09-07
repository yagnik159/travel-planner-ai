import { useCallback, useState } from "react";
import AsyncSelect from "react-select/async";
import DatePicker from "../components/date";
import Spinner from "../components/spinner";
import Header from "../components/header";
import Budget from "@/components/budget";
import Category from "@/components/category";
import Activities from "@/components/activities";
import SelectOptions from "@/components/options";
import axios from "axios";
import TripPlan from "@/components/tripPlan";
import Loader from "@/components/loader";
import HotelRecommendations from "@/components/hotelRecommendations";
import CityDetailsCrad from "@/components/cityDetailsCrad";

export default function Plan() {
  const [formParams, setFormParams] = useState({
    destination: null,
    start_date: null,
    days: 1,
    budget: null,
    group_type: null,
    travelers: 1,
    interests: null,
    cuisine_types: null,
  });

  const [formParamsError, setFormParamsError] = useState({});

  const [tripPlanRes, setTripPlanRes] = useState(RESULT);

  const [loader, setLoader] = useState(false);

  const [cityOptions, setCityOptions] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);

  const [cityInput, setCityInput] = useState("");

  const fetchCity = async (inputValue) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/search-city?q=${inputValue}`
    );

    const cityData = res.data;

    const options = cityData.city_id.map((cityId) => {
      return {
        value: cityData.city_map_by_id[cityId].name,
        label: cityData.city_map_by_id[cityId].id,
        ...cityData.city_map_by_id[cityId],
      };
    });

    return options || [];
  };

  const onSearchCity = useCallback(
    async (e) => {
      const value = e.target.value;

      setCityInput(value);

      if (!value || value.length < 3) return;

      const _cityOptions = await fetchCity(value);

      setCityOptions(_cityOptions);
    },
    [setCityInput]
  );

  const onSelectCity = (_city) => {
    setSelectedCity(_city);
    setCityInput(_city.name);
    updateFormParams({
      destination: _city.name,
    });
    setCityOptions([]);
  };

  const updateFormParams = useCallback(
    (newVal) => {
      if (!newVal) return;

      const [key] = Object.entries(newVal)[0];

      setFormParams({ ...formParams, ...newVal });

      setFormParamsError({ ...formParamsError, [key]: false });
    },
    [setFormParams, setFormParamsError, formParams, formParamsError]
  );

  const onFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      let _formParamsError = {};

      Object.keys(formParams).forEach((key) => {
        if (!formParams[key] || formParams[key]?.length === 0) {
          _formParamsError = Object.assign(_formParamsError, { [key]: true });
        }
      });

      setFormParamsError(_formParamsError);

      try {
        setLoader(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/suggest-trip`,
          formParams
        );
        setLoader(false);
        setTripPlanRes(res.data);
      } catch (error) {
        setLoader(false);
      }
    },
    [setFormParams, setFormParamsError, formParams, formParamsError]
  );

  if (loader) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }

  if (tripPlanRes) {
    return (
      <>
        <Header />
        {/* <CityDetailsCrad destination={"Goa, India"} /> */}
        {/* <TripPlan tripPlanRes={tripPlanRes} /> */}
        <HotelRecommendations data={formParams} />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="text-center flex-1">
        <div className="container mx-auto mb-20 sm:mb-32 mt-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1 sm:flex-[0_0_55%] sm:mx-auto">
              <div className="text-2xl sm:text-4xl font-medium mb-8 sm:mb-12 font-IBMPlex">
                Tell us your travel preferences
              </div>
              <form className="flex flex-col gap-10" onSubmit={onFormSubmit}>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg">
                      What is destination of choice?
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="search"
                      value={cityInput}
                      className="cityInput"
                      onChange={onSearchCity}
                    />
                    {cityOptions && cityOptions.length > 0 ? (
                      <div className="citySearchModal">
                        {cityOptions.map((_city) => {
                          return (
                            <div
                              key={_city.id}
                              onClick={() => onSelectCity(_city)}
                            >
                              {_city.name}
                            </div>
                          );
                        })}
                      </div>
                    ) : null}

                    <div className="form-error">
                      {formParamsError?.destination
                        ? "Please select the destination of your choice*"
                        : null}
                    </div>
                  </div>
                </div>
                <hr className="my-7"></hr>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg">
                      When are you planning to travel?
                    </div>
                  </div>
                  <div className="border">
                    <DatePicker onChangeCallback={updateFormParams} />
                  </div>
                  <div className="form-error">
                    {formParamsError?.start_date
                      ? "Please select the start date your of your journey*"
                      : null}
                  </div>
                </div>
                <hr className="my-7"></hr>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg">
                      How many days are you planning to travel?
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-lg md:text-lg">Day</div>
                    <Spinner onChangeCallback={updateFormParams} />
                  </div>
                  <div className="form-error">
                    {formParamsError?.days
                      ? "Please select atleast one of traveler*"
                      : null}
                  </div>
                </div>
                <hr className="my-7"></hr>
                <div>
                  <div className="flex flex-col items-start gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg mb-[10px]">
                      What is Your Budget?
                    </div>
                    <p className="-mt-4 mb-4 sm:mb-6 text-sm sm:text-base text-zinc-700 font-light">
                      The budget is exclusively allocated for activities and
                      dining purposes.
                    </p>
                  </div>
                  <div className="category">
                    <Budget onChangeCallback={updateFormParams} />
                    <div className="form-error">
                      {formParamsError?.budget
                        ? "Please select your budget*"
                        : null}
                    </div>
                  </div>
                </div>
                <hr className="my-7"></hr>
                <div>
                  <div className="flex flex-col items-start gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg mb-[10px]">
                      Who do you plan on traveling with on your next adventure?
                    </div>
                  </div>
                  <div className="category">
                    <Category onChangeCallback={updateFormParams} />
                    <div className="form-error">
                      {formParamsError?.group_type
                        ? "Please select travel buddy.*"
                        : null}
                    </div>
                  </div>
                </div>
                <hr className="my-7"></hr>
                <div>
                  <div className="flex flex-col items-start gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg mb-[10px]">
                      Which activities are you interested in?
                    </div>
                  </div>
                  <div className="category">
                    <Activities onChangeCallback={updateFormParams} />
                    <div className="form-error">
                      {formParamsError?.interests
                        ? "Please select your interested activity*"
                        : null}
                    </div>
                  </div>
                </div>
                <hr className="my-7"></hr>
                <div>
                  <div className="flex flex-col items-start gap-2 mb-4">
                    <div className="font-semibold text-base sm:text-lg md:text-lg mb-[10px]">
                      Would you like to have these options?
                    </div>
                  </div>
                  <div className="">
                    <SelectOptions onChangeCallback={updateFormParams} />
                    <div className="form-error">
                      {formParamsError?.cuisineTypes
                        ? "Please select whether you would like to have these options*"
                        : null}
                    </div>
                  </div>
                </div>
                <div className="w-full fixed bottom-0 left-0 py-4 border-t-2 bg-white border-gray-300 px-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-zinc-900 rounded-lg text-white font-medium py-3 px-8 w-fit text-center flex items-center justify-center gap-2 text-sm sm:text-base hover:opacity-90 transition-all duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const RESULT = {
  days: [
    {
      title: "Day 1",
      day: 1,
      activities: [
        {
          local_time: "09:00",
          location_name: "Chapora Fort",
          budget_inr: 0,
          duration_min: 120,
          activity_types: ["outdoor"],
          activity_description:
            "Start your day by visiting Chapora Fort, known for its scenic views of the Arabian Sea. Take a leisurely walk around the fort and enjoy the panoramic view of the surroundings.",
        },
        {
          local_time: "12:00",
          location_name: "Anjuna Beach",
          budget_inr: 500,
          duration_min: 240,
          activity_types: ["beach"],
          activity_description:
            "Head to Anjuna Beach for some relaxing time by the sea. Soak up the sun, take a dip in the crystal-clear waters, and indulge in water sports like jet skiing or parasailing.",
        },
        {
          local_time: "16:00",
          location_name: "Basilica of Bom Jesus",
          budget_inr: 0,
          duration_min: 90,
          activity_types: ["sightseeing"],
          activity_description:
            "Visit the historic Basilica of Bom Jesus, a UNESCO World Heritage Site and one of the oldest churches in Goa. Admire its stunning architecture and learn about its historical significance.",
        },
        {
          local_time: "19:00",
          location_name: "Vegetarian Restaurant",
          budget_inr: 1000,
          duration_min: 90,
          activity_types: ["food"],
          activity_description:
            "Enjoy a delicious vegetarian dinner at a local restaurant. Goa offers a wide range of vegetarian dining options, from traditional Goan cuisine to international dishes.",
        },
      ],
      day_summary:
        "Explore the scenic Chapora Fort, relax on Anjuna Beach, visit the historic Basilica of Bom Jesus, and savor a vegetarian dinner.",
    },
    {
      title: "Day 2",
      day: 2,
      activities: [
        {
          local_time: "09:00",
          location_name: "Dudhsagar Falls",
          budget_inr: 1500,
          duration_min: 360,
          activity_types: ["outdoor"],
          activity_description:
            "Embark on an exciting trip to Dudhsagar Falls, one of the tallest waterfalls in India. Enjoy the scenic drive to the falls and marvel at the breathtaking beauty of the cascading water.",
        },
        {
          local_time: "14:00",
          location_name: "Palolem Beach",
          budget_inr: 1000,
          duration_min: 240,
          activity_types: ["beach"],
          activity_description:
            "Head to Palolem Beach for a relaxing afternoon. This pristine beach offers a tranquil atmosphere, perfect for sunbathing, swimming, and enjoying beachside shacks serving delicious seafood.",
        },
        {
          local_time: "18:00",
          location_name: "Local Market",
          budget_inr: 500,
          duration_min: 120,
          activity_types: ["shopping"],
          activity_description:
            "Explore the local market to buy souvenirs, handicrafts, spices, and traditional Goan products. Bargain for unique items and experience the vibrant local culture.",
        },
        {
          local_time: "20:00",
          location_name: "Vegetarian Restaurant",
          budget_inr: 1000,
          duration_min: 90,
          activity_types: ["food"],
          activity_description:
            "Enjoy a delightful vegetarian dinner at a local restaurant. Try some authentic Goan dishes like Veg Xacuti or Mushroom Caldin, rich in flavors and spices.",
        },
      ],
      day_summary:
        "Visit Dudhsagar Falls, relax at Palolem Beach, explore the local market, and indulge in a vegetarian dinner.",
    },
    {
      title: "Day 3",
      day: 3,
      activities: [
        {
          local_time: "09:00",
          location_name: "Aguada Fort",
          budget_inr: 0,
          duration_min: 120,
          activity_types: ["sightseeing"],
          activity_description:
            "Start your day by visiting Aguada Fort, a historic Portuguese fort with stunning views of the Arabian Sea. Explore the fort and its lighthouse, and learn about its colonial past.",
        },
        {
          local_time: "12:00",
          location_name: "Calangute Beach",
          budget_inr: 500,
          duration_min: 240,
          activity_types: ["beach"],
          activity_description:
            "Head to Calangute Beach, known as the 'Queen of Beaches' in Goa. Relax on the golden sand, take a dip in the sea, and enjoy beach activities like banana boat rides or beach volleyball.",
        },
        {
          local_time: "15:00",
          location_name: "Spice Plantation",
          budget_inr: 1000,
          duration_min: 180,
          activity_types: ["sightseeing", "food"],
          activity_description:
            "Visit a spice plantation and take a guided tour to learn about various spices grown in Goa. Experience the aroma and taste of freshly prepared Goan dishes made with these spices.",
        },
        {
          local_time: "19:00",
          location_name: "Vegetarian Restaurant",
          budget_inr: 1000,
          duration_min: 90,
          activity_types: ["food"],
          activity_description:
            "End your trip with a savory vegetarian dinner at a local restaurant. Enjoy the flavors of Goan cuisine and bid farewell to this beautiful coastal destination.",
        },
      ],
      day_summary:
        "Discover Aguada Fort, unwind at Calangute Beach, explore a spice plantation, and relish a vegetarian dinner.",
    },
  ],
};
