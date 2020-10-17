import React, { useState } from "react";
import "../styles/List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faWrench,
  faShower,
} from "@fortawesome/free-solid-svg-icons";

export default function Details({ location }) {
  // State to hide or view details about amenities, restaurants, and truck services
  const [view, setView] = useState("hide");

  // list of amenities, restaurants, and truckServices to be rendered
  const amenities = [
    "ATM",
    "CAT Scales",
    "Private Showers",
    "Transflo",
    "Truck Parking",
    "WiFi"
  ];
  const restaurants = [
    "Arby's",
    "Baskin Robbins",
    "Burger King",
    "Carl's Jr.",
    "Chester's",
    "Del Taco",
    "Godfather's Pizza",
    "Hardee's",
    "IHOP Express",
    "McDonald's",
    "Subway",
    "Taco Bell",
  ];
  const truckServices = [
    "Light Mechanical",
    "Commercial Truck Oil Change",
    "Truck Tire Care",
    "TirePass",
  ];

  return (
    <>
    {/* if view State is "hide", only display link to click on details */}
      {view === "hide" && (
        <div className="hide" onClick={() => setView("show")}>
          Details...
        </div>
      )}

      {/* if view State is "show", display all amenities, restaurants, and truck services of given location */}
      {view === "show" && (
        <>
          <div className="amenities details">
            <div className="detail-type">
              <div className="icon-detail">
                <FontAwesomeIcon icon={faShower} size="lg" color="#EE5455" />{" "}
              </div>
              <div className="category">
                <h3>Amenities</h3>
              </div>
            </div>
            <div className="descriptions">
              <ul>
                {location.CustomFields.map((obj) => {
                  if (amenities.includes(obj.CustomField.DisplayName)) {
                    return <li>{obj.CustomField.DisplayName}</li>;
                  }
                })}
              </ul>
            </div>
          </div>
          <div className="restaurants details">
            <div className="detail-type">
              <div className="icon-detail">
                <FontAwesomeIcon icon={faUtensils} size="lg" color="#EE5455" />{" "}
              </div>
              <div className="category">
                <h3>Restaurants</h3>
              </div>
            </div>
            <div className="descriptions">
              <ul>
                {location.Concepts.map((obj) => {
                  if (restaurants.includes(obj.Concept.Name)) {
                    return <li>{obj.Concept.Name}</li>;
                  }
                })}
              </ul>
            </div>
          </div>
          <div className="services details">
            <div className="detail-type">
              <div className="icon-detail">
                <FontAwesomeIcon icon={faWrench} size="lg" color="#EE5455" />{" "}
              </div>
              <div className="category">
                <h3>Services</h3>
              </div>
            </div>
            <div className="descriptions">
              <ul>
                {location.CustomFields.map((obj) => {
                  if (truckServices.includes(obj.CustomField.DisplayName)) {
                    if (obj.CustomField.DisplayName === "Commercial Truck Oil Change") {
                      return <li>Oil Change</li>
                    } else {
                      return <li>{obj.CustomField.DisplayName}</li>;
                    }
                  }
                })}
              </ul>
            </div>
          </div>
          <div className="hide" onClick={() => setView("hide")}>
            Hide details
          </div>
        </>
      )}
    </>
  );
}