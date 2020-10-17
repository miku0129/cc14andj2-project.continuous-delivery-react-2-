import React, { useState } from "react";
import "./App.css";
import Map from "./containers/Map";
import Input from "./components/Input";
import List from "./components/List";
import { getLocations } from "./actions/index";

export default function App() {
  // State for list of filtered locations; set by Input component and passed as props to List and Map
  const [locations, setLocations] = useState([]);

  return (
    <div className="App" key="App" style={{ height: "100%" }}>
      <header>
        <div id="logo">
          <img
            alt="logo"
            id="logoimg"
            src="https://i.ibb.co/8BNznwK/booboo2.png"
            onClick={() => setLocations([])}
          />
        </div>
      </header>

      <div id="main-container">
        <div id="input">
          {/* Input component will update locations State */}
          <Input
            onChange={(filteredLocations) => setLocations(filteredLocations)}
          />
        </div>

        <div id="listMap-container">
          {/* List component will receive all locations to be listed after filtering */}
          <List
            locations={locations}
            clear={() => {
              setLocations([]);
            }}
          />

          {/* Map component will receive all locations to render markers after filtering */}
          <Map id="map" locs={locations} getLocations={getLocations} />
        </div>
      </div>
      <footer>
        <div id="foot">Copyright © 2020 Miku, Akina, Eri, and Cat</div></footer>
    </div>
  );
}
