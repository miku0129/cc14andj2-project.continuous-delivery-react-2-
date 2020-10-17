const fs = require("fs");

exports.seed = async function(knex) {
  await knex("locations").del();
  try {
    const locations = JSON.parse(fs.readFileSync("./data/locations.json"));
    for (const location of locations) {
      const id = location.Site.SiteId;
      const latitude = location.Site.Latitude;
      const longitude = location.Site.Longitude;
      const name = location.PreferredName;
      const AcceptedPaymentTypes = JSON.stringify(
        location.AcceptedPaymentTypes
      );
      const AdditionalAmenities = JSON.stringify(location.AdditionalAmenities);
      const Addresses = JSON.stringify(location.Addresses);
      const ContactMethods = JSON.stringify(location.ContactMethods);
      const CustomFields = JSON.stringify(location.CustomFields);
      const FuelPrices = JSON.stringify(location.Site.FuelPrices);
      const Concepts = JSON.stringify(location.Site.Concepts);
      const DescriptiveAddress = location.Site.DescriptiveAddress;

      const result = await knex("locations").insert({
        id,
        latitude,
        longitude,
        name,
        AcceptedPaymentTypes,
        AdditionalAmenities,
        Addresses,
        ContactMethods,
        CustomFields,
        FuelPrices,
        Concepts,
        DescriptiveAddress,
      });
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};
