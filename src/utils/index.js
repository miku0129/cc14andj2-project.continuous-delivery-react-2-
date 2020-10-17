import axios from "axios";

export async function getMarkers() {
  // fetch data
  const { data: locations } = await axios.get("/api/locations"); // ES6 destructuring & aliasing
  // Return [{position:{lat,lat},key:'',defa, adress,phone}] for all locations
  const markers = locations.map((l) => ({
    latitude: l.latitude,
    longitude: l.longitude,
    name: l.name,
    id: l.id,
    key: l.name + l.id,
    defaultAnimation: 2,
    DescriptiveAddress: l.DescriptiveAddress,
    Addresses: [
      {Address1: l.Addresses[0].Address1,
        City: l.Addresses[0].City,
        State: l.Addresses[0].State,
        Zip: l.Addresses[0].Zip
      }
    ],
    phone: l.ContactMethods.filter(
      (contactMethods) => contactMethods.Type.Name === "Main Phone"
    ).map((contactMethods) => contactMethods.Data),
  }));
  return markers;
}
