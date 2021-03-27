
exports.up = async function(knex) {
 await knex.schema.createTable("users",(t)=>{
     t.increments();
     t.string("email").notNull().unique();
     t.string("username").notNull();
     t.string("password").notNull();
 })
};
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
