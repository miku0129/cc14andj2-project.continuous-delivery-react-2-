import React, { useState, useEffect } from "react";
import "../styles/List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import Details from "./Details";

export default function List({ locations, clear }) {
  const [noResults, setNoResults] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter + 1);
    if (counter > 0) {
      setNoResults("No Results. Please try again.")
    }
  }, [locations])

  return (
    <div id="list-container">
      {locations.length === 0 && <div>{noResults}</div>}
      {locations.length > 0 && (
        <div id="num-results">
          <p id="showing">{`Showing ${locations.length} results...`}</p>
          <p id="clear" onClick={() => {
            setCounter(0)
            setNoResults("");
            clear()
            }}>
            Clear Results
          </p>
        </div>
      )}
      {locations.map((location, index) => (
        <div className="store-card">
          <div className="name">
            <div className="counter">
              <h1>{index + 1}</h1>
            </div>
            <div className="nameholder">
              <h2>{location.name}</h2>
              <h4>Store{" " + location.id}</h4>
            </div>
            <h4>{location.DescriptiveAddress}</h4>
          </div>
          <div className="overview">
            <div className="address">
              <div className="icon">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  size="lg"
                  color="#EE5455"
                />{" "}
              </div>
              <div className="address-text">
                <div className="address-details">
                  {location.Addresses[0].Address1}
                </div>
                <div className="address-details">
                  {location.Addresses[0].City + ", "}
                  {location.Addresses[0].State}
                  {" " + location.Addresses[0].Zip}
                </div>
              </div>
            </div>
            <div className="phone">
              <div className="icon">
                <FontAwesomeIcon icon={faPhoneAlt} size="lg" color="#EE5455" />{" "}
              </div>
              <div className="phone-details">
                {location.ContactMethods.filter(
                  (contactMethods) => contactMethods.Type.Name === "Main Phone"
                ).map((contactMethods) => contactMethods.Data)}
              </div>
            </div>
          </div>
          <Details location={location} />
        </div>
      ))}
    </div>
  );
}
