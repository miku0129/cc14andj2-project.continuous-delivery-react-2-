exports.up = function(knex) {
  return knex.schema.table("locations", (table) => {
    table.text("DescriptiveAddress");
  });
};

exports.down = function(knex) {};
