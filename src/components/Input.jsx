/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import "../styles/input.css";
import axios from "axios";

export default function Input({ onChange }) {
  // all filters
  const [selectCity, setSelectCity] = useState("");
  const [selectState, setSelectState] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [truckServices, setTruckServices] = useState([]);

  // all filter options
  const checkboxesAmenities = [
    { name: "ATM", key: "ATM", label: "ATM" },
    { name: "CAT Scales", key: "CAT Scales", label: "CAT Scales" },
    { name: "Truck Parking", key: "Truck Parking", label: "Truck Parking" },
    {
      name: "Private Showers",
      key: "Private Showers",
      label: "Private Showers",
    },
    { name: "Transflo", key: "Transflo", label: "Transflo" },
    { name: "WiFi", key: "WiFi", label: "WiFi" },
  ];
  const checkboxesRestaurants = [
    { name: "Arby's", key: "Arby's", label: "Arby's" },
    { name: "Baskin Robbins", key: "Baskin Robbins", label: "Baskin Robbins" },
    { name: "Burger King", key: "Burger King", label: "Burger King" },
    { name: "Carl's Jr.", key: "Carl's Jr.", label: "Carl's Jr" },
    { name: "Chester's", key: "Chester's", label: "Chester's" },
    { name: "Del Taco", key: "Del Taco", label: "Del Taco" },
    { name: "Godfather's Pizza", key: "Godfather's Pizza", label: "Godfather's Pizza" },
    { name: "Hardee's", key: "Hardee's", label: "Hardee's" },
    { name: "IHOP Express", key: "IHOP Express", label: "IHOP Express" },
    { name: "McDonald's", key: "McDonald's", label: "McDonald's" },
    { name: "Subway", key: "Subway", label: "Subway" },
    { name: "Taco Bell", key: "Taco Bell", label: "Taco Bell" },
  ];

  const checkboxesTruckServices = [
    {
      name: "Light Mechanical",
      key: "Light Mechanical",
      label: "Light Mechanical",
    },
    { name: "Oil Change", key: "Oil Change", label: "Oil Change" },
    { name: "Truck Tire Care", key: "Truck Tire Care", label: "Truck Tire Care" },
    { name: "TirePass", key: "TirePass", label: "TirePass" },
  ];

  const states = [
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MP",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];

  function clearFilters() {
    setSelectCity("");
    setSelectState("");
    setAmenities([]);
    setRestaurants([]);
    setTruckServices([]);
  }

  // function fetches locations based on location and filters locations down based on inputs
  // returns array of location objects
  async function filterLocations() {
    let res;
    let req;

    // if state is selected without city, fetch for locations by given state
    if (selectState && !selectCity) {
      req = await axios.get(`/api/locations/${selectState}`);
      res = req.data;
    }

    // if state and city are selected, fetch for locations by given state and city
    if (selectState && selectCity) {
      req = await axios.get(`/api/locations/${selectState}/${selectCity}`);
      res = req.data;
    }

    // if amenities State has array length greater than 0, filter results down to locations with selected amenities
    if (amenities.length > 0) {
      res = res.filter((loc) => {
        const dataAmenities = [];
        // loop through each location's customFields obj and push the name of each amenity into array
        for (const amenityObj of loc.CustomFields) {
          dataAmenities.push(amenityObj.CustomField.DisplayName);
        }
        // loop through selected amenities State and check if they're included in array of amenities belonging to location
        for (const amenity of amenities) {
          if (!dataAmenities.includes(amenity)) {
            return false;
          }
        }
        return true;
      });
    }

    // if restaurants State has array length greater than 0, filter results down to locations with selected restaurants
    if (restaurants.length > 0) {
      res = res.filter((loc) => {
        const dataRestaurants = [];
        // loop through each location's Concepts obj and push the name of each restaurant into array
        for (const restObj of loc.Concepts) {
          dataRestaurants.push(restObj.Concept.Name);
        }
        // loop through selected restaurants State and check if they're included in array of restaurants belonging to location
        for (const restaurant of restaurants) {
          if (!dataRestaurants.includes(restaurant)) {
            return false;
          }
        }
        return true;
      });
    }

    // if truckServices State has array length greater than 0, filter results down to locations with selected truck services
    if (truckServices.length > 0) {
      res = res.filter((loc) => {
        const dataAmenities = [];
        // loop through each location's CustomFields obj and push the name of truck services into array
        for (const amenityObj of loc.CustomFields) {
          dataAmenities.push(amenityObj.CustomField.DisplayName);
        }
        // loop through selected truck services State and check if they're included in array of truck services belonging to location
        for (const truckService of truckServices) {
          if (!dataAmenities.includes(truckService)) {
            return false;
          }
        }
        return true;
      });
    }
    // pass array of filtered locations back to App to set State
    onChange(res);
  }

  return (
    <>
      <div id="input-base">
        <div className="input-container" id="loc">
          <div className="title">
            <h3 className="title-text">Location</h3>
          </div>
          <div className="select-wrapper">
            {/* input for city */}
            <input
              id="city-input"
              type="text"
              placeholder="City"
              value={selectCity}
              autoComplete="address-level2"
              onChange={(e) => setSelectCity(e.target.value)}
            ></input>

            {/* input for state dropdown menu*/}
            <select
              value={selectState}
              onChange={(e) => {
                setSelectState(e.target.value);
              }}
              required
            >
              <option id="defaultState" style={{ fontColor: "lightgrey" }}>
                State
              </option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <p style={{ color: "#EE5456", padding: "4px" }}>*Required</p>
          </div>
        </div>

        {/* check box for Amenity */}
        <div className="input-container">
          <div className="title">
            <h3 className="title-text">Amenities</h3>
          </div>
          <div className="select-wrapper">
            {checkboxesAmenities.map((item) => (
              <label 
                className="label" 
                key={item.key}
              >
                <input
                  type="checkbox"
                  label={item.label}
                  value={item.name}
                  onChange={(e) => {
                    // onChange event will switch e.target.checked at the start of this function
                    // checks to see if checked is false (opposite); if so, remove from State
                    if (!e.target.checked) {
                      setAmenities((state) => {
                        return state.filter(amenity => e.target && amenity !== e.target.value)
                      })
                    } else {
                      setAmenities([...amenities, e.target.value]);
                    }
                  }}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>

        {/* check box for Restaurant */}
        <div className="input-container">
          <div className="title">
            <h3 className="title-text">Restaurants</h3>
          </div>
          <div className="select-wrapper">
            {checkboxesRestaurants.map((item, index) => (
              <div className="label restaurants" key={item.key}>
                <input
                  type="checkbox"
                  label={item.label}
                  value={item.name}
                  onChange={(e) => {
                    // onChange event will switch e.target.checked at the start of this function
                    // checks to see if checked is false (opposite); if so, remove from State
                    if (!e.target.checked) {
                      setRestaurants((state) => {
                        return state.filter(restaurant => e.target && restaurant !== e.target.value)
                      })
                    } else {
                      setRestaurants([...restaurants, e.target.value]);
                    }
                  }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* truck service */}
        <div className="input-container">
          <div className="title">
            <h3 className="title-text">Truck Service</h3>
          </div>
          <div className="select-wrapper">
            {checkboxesTruckServices.map((item) => (
              <div className="label" key={item.key}>
                <input
                  type="checkbox"
                  label={item.label}
                  value={truckServices}
                  onChange={(e) => {

                    // onChange event will switch e.target.checked at the start of this function
                    // checks to see if checked is false (opposite); if so, remove from State
                    if (!e.target.checked) {
                      setTruckServices((state) => {
                        return state.filter(truckServices => e.target && truckServices !== e.target.value)
                      })
                    } else {
                      setTruckServices([...truckServices, e.target.value]);
                    }
                  }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="button-container">
        <div className="input button-wrapper">
          {(!selectState || selectState === "State") && (
            <button id="disabled">Filter Results</button>
          )}
          {selectState && selectState !== "State" && (
            <button onClick={filterLocations}>Filter Results</button>
          )}
        </div>
        <div
          id="clear-filter"
          onClick={() => {
            clearFilters();
          }}
        >
          Clear Filter
        </div>
      </div>
    </>
  );
}
