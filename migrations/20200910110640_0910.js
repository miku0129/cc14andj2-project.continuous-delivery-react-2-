exports.up = function(knex) {
  return knex.schema.table("locations", (table) => {
    table.json("AcceptedPaymentTypes");
    table.json("AdditionalAmenities");
    table.json("Addresses");
    table.json("ContactMethods");
    table.json("CustomFields");
    table.json("FuelPrices");
    table.json("Concepts");
  });
};

exports.down = function(knex) {};
