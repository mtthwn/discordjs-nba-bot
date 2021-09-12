exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teams')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('teams').insert([
        { id: 1, name: 'Blue Jays', city: 'Toronto' },
        { id: 2, name: 'Yankees', city: 'New York' },
        { id: 3, name: 'Red Socks', city: 'Boston' },
      ]);
    });
};
