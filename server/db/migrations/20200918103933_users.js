
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.int('garden_id')
        table.string('username')
        table.binary('hash')
        table.boolean('isAdmin')
        
      })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
  
};
