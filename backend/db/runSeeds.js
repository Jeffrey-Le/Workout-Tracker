const db = require('../config/db'); // Adjust path to your knex configuration file

(async function runSeeds() {
  try {
    console.log('Starting seed process...');

    // Run all seed files
    await db.seed.run();
    
    console.log('Seeding complete.');
  } catch (error) {
    console.error('Error running seeds:', error.message);
  } finally {
    // Close the database connection
    await db.destroy();
  }
})();
