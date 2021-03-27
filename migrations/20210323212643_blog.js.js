
exports.up = async function(knex) {
  await knex.schema.createTable("blogs",(t) =>{
      t.increments();
      t.string("title");
      t.text("description");
      t.string("author");
      t.date('writing_date');
      t.bigInteger("user_id").references("id").inTable("users").notNull();
  } )
};

exports.down = async function(knex) {
    return await knex.schema.dropTableIfExists('blogs');
  
};
