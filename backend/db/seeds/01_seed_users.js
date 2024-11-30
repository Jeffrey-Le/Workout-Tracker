const bcrypt = require('bcrypt'); // For hashing passwords

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Generates password hashes for seeding
  const passwordHash1 = await bcrypt.hash('password123', 10);
  const passwordHash2 = await bcrypt.hash('securepassword', 10);
  const passwordHash3 = await bcrypt.hash('mypassword', 10);

  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'john_doe',
      password_hash: passwordHash1,
      email: 'john.doe@example.com',
      age: 24,
      gender: 'Male',
      height: 180,
    },
    {
      username: 'jane_doe',
      password_hash: passwordHash2,
      email: 'jane.doe@example.com',
      age: 31,
      gender: 'Female',
      height: 165,
    },
    {
      username: 'sam_smith',
      password_hash: passwordHash3,
      email: 'sam.smith@example.com',
      age: 16,
      gender: 'Male',
      height: 175,
    },
  ]);
};
