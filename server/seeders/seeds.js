const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});
  await User.collection.insertMany([ { username: 'admin', password: 'password', email: 'email@email.com' } ]);

  console.log('all done!');
  process.exit(0);
});