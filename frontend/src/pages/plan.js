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

export default function Plan() {
  const [formParams, setFormParams] = useState({
    destination: null,
    start_date: null,
    days: null,
    budget: null,
    group_type: null,
    travelers: 1,
    interests: null,
    cuisineTypes: null,
  });

  const [formParamsError, setFormParamsError] = useState({});

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
    (e) => {
      e.preventDefault();

      let _formParamsError = {};

      Object.keys(formParams).forEach((key) => {
        if (!formParams[key]) {
          _formParamsError = Object.assign(_formParamsError, { [key]: true });
        }
      });

      setFormParamsError(_formParamsError);
    },
    [setFormParams, setFormParamsError, formParams, formParamsError]
  );

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
                              onClick={() => {
                                setSelectedCity(_city);
                                setCityInput(_city.name);
                                updateFormParams({
                                  destination: _city.name,
                                });
                                setCityOptions([]);
                              }}
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
                    {formParamsError?.travelers
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
                        ? "Please select a destination*"
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
                        ? "Please select a destination*"
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
                        ? "Please select a destination*"
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
                        ? "Please select a destination*"
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
      ;
    </>
  );
}
