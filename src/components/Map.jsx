import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  LatLngBounds,
  fitBounds,
} from "react-google-maps";
import "../styles/Map.css";

// withGoogleMap takes a react component and returns one. We call these "Higher Order Components"
const MyMap = withGoogleMap((props) => {
  const [selectedLoc, setSelectedLoc] = useState(null);
  // still working on logic to auto zoom on select markers
  // const bounds = new google.maps.LatLngBounds();

  // useEffect(() => {
  //   props.markers.map(loc => {
  //     bounds.extend()
  //   })
  //   bounds.extend(myPlace);
  //   bounds.extend(Item_1);
  //   map.fitBounds(bounds);

  // },[props.markers])

  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={5}
      defaultCenter={{ lat: 39.0119, lng: -104.9903 }}
    >
      {props.markers.map((marker) => {
        return (
          <div>
            <Marker
              key={marker.name + marker.id}
              position={{
                lat: marker.latitude,
                lng: marker.longitude,
              }}
              icon={
                "https://img.icons8.com/color/48/000000/interstate-truck.png"
              }
              onClick={() => {
                setSelectedLoc(marker);
              }}
            />
            {selectedLoc && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedLoc(null);
                }}
                position={{
                  lat: selectedLoc.latitude,
                  lng: selectedLoc.longitude,
                }}
              >
                <div className="infoWindow">
                  <div>
                    <h3>{selectedLoc.name}</h3>
                  </div>
                  <div>
                    <div>
                      <div>{selectedLoc.Addresses[0].Address1}</div>
                      <div>
                        {selectedLoc.Addresses[0].City + ", "}
                        {selectedLoc.Addresses[0].State}
                        {" " + selectedLoc.Addresses[0].Zip}
                      </div>
                      <div>
                        {selectedLoc.ContactMethods.filter(
                          (contactMethods) =>
                            contactMethods.Type.Name === "Main Phone"
                        ).map((contactMethods) => contactMethods.Data)}
                      </div>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </div>
        );
      })}
    </GoogleMap>
  );
});
// We use object destructuring here to shorten our code
export default function Map({ locations, locs, getLocations }) {
  const changeLength = locations.length <= 0;
  // fetches all markers at one time
  useEffect(() => {
    if (changeLength) {
      getLocations();
    }
  }, [changeLength, getLocations]);
  return (
    <MyMap
      containerElement={<div id="map-container" />}
      mapElement={<div id="map" />}
      onMapLoad={() => {}}
      onMapClick={() => {}}
      markers={locs}
      onMarkerClick={() => {}}
      onMarkerRightClick={() => {}}
    />
  );
}
// This looks new? Can you guess what this does?
Map.propTypes = {
  getLocations: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
};
